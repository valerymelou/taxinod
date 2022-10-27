from django.contrib import admin
from modeltranslation.admin import TranslationAdmin as ModelWithTranslationAdmin

from .models import City, Country, State


@admin.register(City)
class CityAdmin(ModelWithTranslationAdmin):
    list_display = ("name", "slug", "state", "is_active", "created", "modified")
    search_fields = ("name", "state__name")
    list_filter = ("is_active", "created")
    date_hierarchy = "created"
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Country)
class CountryAdmin(ModelWithTranslationAdmin):
    list_display = ("name", "code", "is_active", "created", "modified")
    search_fields = ("name", "code")
    list_filter = ("is_active", "created")
    date_hierarchy = "created"


@admin.register(State)
class StateAdmin(ModelWithTranslationAdmin):
    list_display = ("name", "slug", "country", "is_active", "created", "modified")
    search_fields = ("name", "country__name", "country__code")
    list_filter = ("is_active", "created")
    date_hierarchy = "created"
    prepopulated_fields = {"slug": ("name",)}
