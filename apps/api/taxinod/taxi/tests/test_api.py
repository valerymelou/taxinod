import json

from rest_framework import status
from rest_framework.reverse import reverse

from taxinod.core.tests import APITestCase

from .factories import TaxiStopFactory


class TestTaxiStopAPI(APITestCase):
    def setUp(self):
        TaxiStopFactory()
        TaxiStopFactory()

    def test_list(self):
        """
        Ensure that we can list taxi stops.
        """
        url = reverse("api:taxi-stop-list")
        response = self.client.get(url)
        data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data["count"], 2)
