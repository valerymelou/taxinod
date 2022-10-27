from django.contrib import admin
from django.contrib.gis.db import models
from mapwidgets.widgets import GooglePointFieldWidget
from modeltranslation.admin import TranslationAdmin as ModelWithTranslationAdmin

from .models import TaxiRoute, TaxiStop


@admin.register(TaxiStop)
class TaxiStopAdmin(ModelWithTranslationAdmin):
    list_display = (
        "name",
        "city",
        "coordinates",
        "address",
        "is_active",
        "created",
        "modified",
    )
    list_filter = ("is_active", "created")
    search_fields = ("name", "address")
    date_hierarchy = "created"
    formfield_overrides = {models.PointField: {"widget": GooglePointFieldWidget}}


@admin.register(TaxiRoute)
class TaxiRouteAdmin(ModelWithTranslationAdmin):
    list_display = (
        "origin",
        "destination",
        "mode",
        "std_price",
        "night_price",
        "jam_price",
        "hurry_price",
        "rain_price",
    )
    list_filter = ("is_active", "created", "mode", "std_price")
    search_fields = ("origin__name", "destination__name", "notes")
    date_hierarchy = "created"
