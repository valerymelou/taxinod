from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class TaxiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "taxinod.taxi"
    verbose_name = _("Taxi")
