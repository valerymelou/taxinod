from django.db.models import Q
from rest_framework import status
from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from ..graph import Graph
from ..models import TaxiRoute, TaxiStop
from ..types import Path
from .serializers import TaxiResultsSerializer, TaxiStopSerializer


class TaxiStopViewSet(GenericViewSet, ListModelMixin):
    serializer_class = TaxiStopSerializer
    queryset = TaxiStop.objects.filter(is_active=True)
    search_fields = ("name",)


class TaxiSearchView(APIView):
    def get(self, request):
        try:
            origin = TaxiStop.objects.get(
                id=self.request.GET.get("from", None), is_active=True
            )
            destination = TaxiStop.objects.get(
                id=self.request.GET.get("to", None), is_active=True
            )
        except TaxiStop.DoesNotExist:
            return Response(
                {"message": "One of the stops specified does not exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        mode = request.GET.get("mode", TaxiRoute.TaxiMode.CAR)
        data = []

        try:
            route = TaxiRoute.objects.get(
                is_active=True, origin=origin, destination=destination, mode=mode
            )
            path = Path()
            path.routes = [route]
            data.append(path)
        except TaxiRoute.DoesNotExist:
            pass

        routes = TaxiRoute.objects.filter(
            Q(is_active=True), Q(origin=origin) | Q(destination=destination)
        ).distinct()

        graph = Graph()
        for route in routes:
            graph.add_edge(route)

        data += graph.find_paths([origin], [destination])
        serializer = TaxiResultsSerializer(data, many=True)

        return Response(serializer.data)
