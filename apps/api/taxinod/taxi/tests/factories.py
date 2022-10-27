import random

from django.contrib.gis.geos import Point
from factory import Sequence, SubFactory
from factory.django import DjangoModelFactory
from factory.fuzzy import BaseFuzzyAttribute

from taxinod.localization.tests.factories import CityFactory

from ..models import TaxiRoute, TaxiStop


class FuzzyPoint(BaseFuzzyAttribute):
    def fuzz(self):
        return Point(random.uniform(-180.0, 180.0), random.uniform(-90.0, 90.0))


class TaxiStopFactory(DjangoModelFactory):
    name = Sequence(lambda n: f"Taxi Stop {n}")
    city = SubFactory(CityFactory)
    coordinates = FuzzyPoint()

    class Meta:
        model = TaxiStop
        django_get_or_create = ("name", "city")


class TaxiRouteFactory(DjangoModelFactory):
    origin = SubFactory(TaxiStopFactory)
    destination = SubFactory(TaxiStopFactory)
    mode = TaxiRoute.TaxiMode.CAR

    class Meta:
        model = TaxiRoute
        django_get_or_create = ("origin", "destination", "mode")
