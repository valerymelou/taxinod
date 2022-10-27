import uuid

from django.db import models
from model_utils.models import TimeStampedModel


class BaseModel(models.Model):
    """
    Abstract base model for all models in the application.
    Uses a UUID as primary key.
    """

    id = models.UUIDField(
        primary_key=True, db_index=True, default=uuid.uuid4, editable=False
    )

    class Meta:
        abstract = True


class AuditableModel(BaseModel, TimeStampedModel):
    """
    Base model with automatic `created` and `modified` dates.
    """

    class Meta:
        abstract = True
