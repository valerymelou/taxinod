from rest_framework.serializers import (
    ModelSerializer,
    Serializer,
    SerializerMethodField,
)

from ..models import TaxiRoute, TaxiStop


class TaxiStopSerializer(ModelSerializer):
    city = SerializerMethodField()
    state = SerializerMethodField()
    longitude = SerializerMethodField()
    latitude = SerializerMethodField()

    class Meta:
        model = TaxiStop
        fields = ("id", "name", "city", "state", "latitude", "longitude", "address")

    def get_city(self, obj):
        return obj.city.name

    def get_state(self, obj):
        return obj.city.state.name

    def get_latitude(self, obj):
        return obj.coordinates.y

    def get_longitude(self, obj):
        return obj.coordinates.x


class TaxiRouteSerializer(ModelSerializer):
    origin = TaxiStopSerializer()
    destination = TaxiStopSerializer()

    class Meta:
        model = TaxiRoute
        fields = (
            "origin",
            "destination",
            "mode",
            "std_price",
            "night_price",
            "jam_price",
            "hurry_price",
            "rain_price",
            "notes",
            "modified",
        )


class TaxiResultsSerializer(Serializer):
    routes = TaxiRouteSerializer(many=True)

    class Meta:
        fields = ("routes",)
