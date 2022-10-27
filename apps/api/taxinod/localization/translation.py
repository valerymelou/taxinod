from modeltranslation.translator import TranslationOptions, register

from taxinod.localization.models import City, Country, State


@register(Country)
class CountryTranslationOptions(TranslationOptions):
    fields = ("name",)
    required_languages = {"default": ("name",)}


@register(State)
class StateTranslationOptions(TranslationOptions):
    fields = ("name",)
    required_languages = {"default": ("name",)}


@register(City)
class CityTranslationOptions(TranslationOptions):
    fields = ("name",)
    required_languages = {"default": ("name",)}
