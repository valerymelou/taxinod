from taxinod.core.tests import BaseTestCase

from .factories import CityFactory, CountryFactory, StateFactory


class TestCountry(BaseTestCase):
    def setUp(self):
        self.country = CountryFactory(name="Cameroon", code="CM")

    def test__str__(self):
        self.assertEqual("Cameroon", self.country.__str__())


class TestState(BaseTestCase):
    def setUp(self):
        country = CountryFactory(name="Cameroon", code="CM")
        self.state = StateFactory(name="Center", country=country)

    def test__str__(self):
        self.assertEqual("Center, Cameroon", self.state.__str__())


class TestCity(BaseTestCase):
    def setUp(self):
        country = CountryFactory(name="Cameroon", code="CM")
        state = StateFactory(name="Center", country=country)
        self.city = CityFactory(name="Yaounde", state=state)

    def test__str__(self):
        self.assertEqual("Yaounde, Center, Cameroon", self.city.__str__())
