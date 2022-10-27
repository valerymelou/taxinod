from modeltranslation.translator import TranslationOptions, register

from .models import TaxiRoute, TaxiStop


@register(TaxiStop)
class TaxiStopTranslationOptions(TranslationOptions):
    fields = ("name", "address")
    required_languages = {"default": ("name",)}


@register(TaxiRoute)
class TaxiRouteTranslationOptions(TranslationOptions):
    fields = ("notes",)
