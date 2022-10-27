from django.test import TestCase
from rest_framework.reverse import reverse
from rest_framework.settings import api_settings
from rest_framework.test import APITestCase

from taxinod.users.tests.factories import UserFactory


def build_view_name(name):
    return f"{api_settings.DEFAULT_VERSION}:{name}"


def build_path(path):
    return f"/{api_settings.DEFAULT_VERSION}{path}"


class BaseTestCase(TestCase):
    @staticmethod
    def make_user(email="tester@bries.cm", password="password"):
        user = UserFactory(email=email, password=password)
        return user


class BaseAPITestCase(APITestCase, BaseTestCase):
    @classmethod
    def reverse(
        cls, viewname, args=None, kwargs=None, request=None, format_=None, **extra
    ):
        viewname = f"{api_settings.DEFAULT_VERSION}:{viewname}"
        path = reverse(
            viewname=viewname,
            args=args,
            kwargs=kwargs,
            request=request,
            format=format_,
            **extra,
        )

        return path
