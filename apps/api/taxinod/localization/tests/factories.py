from django.utils.text import slugify
from factory import LazyAttribute, Sequence, SubFactory
from factory.django import DjangoModelFactory

from ..models import City, Country, State


class CountryFactory(DjangoModelFactory):
    name = Sequence(lambda n: f"Country {n}")
    code = Sequence(lambda n: f"C{n}")

    class Meta:
        model = Country
        django_get_or_create = ["name", "code"]


class StateFactory(DjangoModelFactory):
    name = Sequence(lambda n: f"State {n}")
    slug = LazyAttribute(lambda s: s.name)
    country = SubFactory(CountryFactory)

    class Meta:
        model = State
        django_get_or_create = ["country", "name"]


class CityFactory(DjangoModelFactory):
    name = Sequence(lambda n: f"City {n}")
    slug = LazyAttribute(
        lambda c: slugify(
            c.name,
        )
    )
    state = SubFactory(StateFactory)

    class Meta:
        model = City
        django_get_or_create = ["state", "name"]
