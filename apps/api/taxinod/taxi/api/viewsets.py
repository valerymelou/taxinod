from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from ..models import TaxiStop
from .serializers import TaxiStopSerializer


class TaxiStopViewSet(GenericViewSet, ListModelMixin):
    serializer_class = TaxiStopSerializer
    queryset = TaxiStop.objects.filter(is_active=True)
    search_fields = ("name",)
