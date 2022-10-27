from taxinod.core.tests import BaseTestCase

from .factories import TaxiRouteFactory, TaxiStopFactory


class TestTaxiStop(BaseTestCase):
    def setUp(self):
        self.taxi_stop = TaxiStopFactory(name="Roundabout Neptune")

    def test__str__(self):
        assert str(self.taxi_stop) == "Roundabout Neptune"


class TestTaxiRoute(BaseTestCase):
    def setUp(self):
        origin = TaxiStopFactory(name="Roundabout Neptune")
        destination = TaxiStopFactory(name="Central Post")
        self.taxi_route = TaxiRouteFactory(origin=origin, destination=destination)

    def test__str__(self):
        assert str(self.taxi_route) == "Roundabout Neptune - Central Post: 100"
