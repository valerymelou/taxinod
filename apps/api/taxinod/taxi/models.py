from django.contrib.gis.db import models
from django.contrib.gis.db.models import Q
from django.utils.translation import gettext_lazy as _
from taxinod.core.models import AuditableModel
from taxinod.localization.models import City


class TaxiStop(AuditableModel):
    """
    Stores a taxi stop in a city.
    Name, city and coordinates are required. Other fields are optional.
    """

    name = models.CharField(_("name"), max_length=100)
    city = models.ForeignKey(
        City, on_delete=models.CASCADE, verbose_name=_("city"), related_name="stops"
    )
    coordinates = models.PointField(geography=True, spatial_index=True, srid=4326)
    address = models.TextField(_("address"), blank=True)
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_("Designates if this taxi stop should be treated as active."),
    )

    class Meta:
        verbose_name = _("taxi stop")
        verbose_name_plural = _("taxi stops")
        ordering = ("name",)
        constraints = (
            models.UniqueConstraint(
                condition=Q(is_active=True),
                fields=("name", "city"),
                name="unique_name_and_city_for_taxi_stop",
            ),
        )

    def __str__(self):
        return self.name

    def __eq__(self, o):
        if hasattr(o, "id") and hasattr(self, "id"):
            return o.id == self.id

        return super().__eq__(o)


class TaxiRoute(AuditableModel):
    """
    Stores a taxi route in a city.
    Origin, destination and price are required. Other fields are optional.
    """

    class TaxiMode(models.IntegerChoices):
        CAR = 1, _("Car")
        MOTORCYCLE = 2, _("Motorcycle")

    origin = models.ForeignKey(
        TaxiStop,
        on_delete=models.CASCADE,
        verbose_name=_("origin"),
        related_name="routes_from_here",
    )
    destination = models.ForeignKey(
        TaxiStop,
        on_delete=models.CASCADE,
        verbose_name=_("destination"),
        related_name="routes_to_here",
    )
    mode = models.PositiveSmallIntegerField(
        _("mode"), choices=TaxiMode.choices, default=TaxiMode.CAR
    )
    std_price = models.PositiveSmallIntegerField(_("standard price"), default=100)
    night_price = models.PositiveSmallIntegerField(
        _("night price"), blank=True, null=True
    )
    jam_price = models.PositiveSmallIntegerField(
        _("traffic jam price"), blank=True, null=True
    )
    hurry_price = models.PositiveSmallIntegerField(
        _("emergency price"), blank=True, null=True
    )
    rain_price = models.PositiveSmallIntegerField(
        _("rain price"), blank=True, null=True
    )
    notes = models.TextField(_("notes"), blank=True)
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_("Designates whether this route should be treated as active."),
    )

    class Meta:
        verbose_name = _("taxi route")
        verbose_name_plural = _("taxi routes")
        ordering = ("std_price",)
        constraints = (
            models.UniqueConstraint(
                condition=Q(is_active=True),
                fields=("origin", "destination", "mode"),
                name="unique_origin_destination_and_mode_for_taxi_route",
            ),
        )

    def __str__(self):
        return f"{self.origin} - {self.destination}: {self.std_price}"

    def __eq__(self, o):
        if hasattr(o, "id") and hasattr(self, "id"):
            return o.id == self.id

        return super().__eq__(o)
