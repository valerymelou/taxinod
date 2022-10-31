from rest_framework.serializers import ModelSerializer, SerializerMethodField

from ..models import TaxiStop


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
