from django.db import models
from django.db.models import Q
from django.utils.translation import gettext_lazy as _

from taxinod.core.models import AuditableModel


class Country(AuditableModel):
    """
    Countries in the application are represented by this model.
    """

    name = models.CharField(_("name"), max_length=100, unique=True)
    code = models.CharField(_("code"), max_length=3, unique=True)
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "designates whether this country should be treated as active or not"
        ),
    )

    class Meta:
        ordering = ("name",)
        verbose_name = _("country")
        verbose_name_plural = _("countries")

    def __str__(self):
        return self.name


class State(AuditableModel):
    """
    States and regions in the application are represented by this model.
    """

    name = models.CharField(_("name"), max_length=100)
    slug = models.SlugField(_("slug"), max_length=100)
    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        verbose_name=_("country"),
        related_name="states",
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "designates whether this state or region should be treated as active or not"
        ),
    )

    class Meta:
        ordering = ("name",)
        verbose_name = _("state or region")
        verbose_name_plural = _("states or regions")
        constraints = (
            models.UniqueConstraint(
                condition=Q(is_active=True),
                fields=("name", "country"),
                name="unique_name_and_country_for_state",
            ),
        )

    def __str__(self):
        return f"{self.name}, {self.country}"


class City(AuditableModel):
    """
    Cities in the application are represented by this model.
    """

    name = models.CharField(_("name"), max_length=100)
    slug = models.SlugField(_("slug"), max_length=100)
    state = models.ForeignKey(
        State,
        on_delete=models.CASCADE,
        verbose_name=_("state or region"),
        related_name="cities",
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_("designates whether this city should be treated as active or not"),
    )

    class Meta:
        ordering = ("name",)
        verbose_name = _("city")
        verbose_name_plural = _("cities")
        constraints = (
            models.UniqueConstraint(
                condition=Q(is_active=True),
                fields=("name", "state"),
                name="unique_name_and_state_for_city",
            ),
        )

    def __str__(self):
        return f"{self.name}, {self.state}"
