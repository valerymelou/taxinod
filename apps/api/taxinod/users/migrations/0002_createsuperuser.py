import os

import google.auth
from django.contrib.auth import get_user_model
from django.db import migrations
from django.db.backends.postgresql.schema import DatabaseSchemaEditor
from django.db.migrations.state import StateApps
from google.cloud import secretmanager


def createsuperuser(apps: StateApps, schema_editor: DatabaseSchemaEditor) -> None:
    """
    Dynamically create an admin user as part of a migration
    Password is pulled from Secret Manger (previously created as part of tutorial)
    """
    if os.environ.get("GOOGLE_CLOUD_PROJECT", None):
        client = secretmanager.SecretManagerServiceClient()

        # Get project value for identifying current context
        _, project = google.auth.default()

        # Retrieve the previously stored admin password
        PASSWORD_NAME = os.environ.get("PASSWORD_NAME", "superuser_password")
        name = f"projects/{project}/secrets/{PASSWORD_NAME}/versions/latest"
        admin_password = client.access_secret_version(name=name).payload.data.decode(
            "UTF-8"
        )

        # Create a new user using acquired password, stripping any accidentally stored newline characters
        get_user_model().objects.create_superuser("admin@taxinod.com", password=admin_password.strip())

def deletesuperuser(apps, schema_editor):
    if os.environ.get("GOOGLE_CLOUD_PROJECT", None):
        User = get_user_model()

        try:
            user = User.objects.get(email="admin@taxinod.com")
            user.delete()
        except get_user_model().DoesNotExist:
            pass



class Migration(migrations.Migration):

    initial = True
    dependencies = [("users", "0001_initial")]
    operations = [migrations.RunPython(createsuperuser, deletesuperuser)]
