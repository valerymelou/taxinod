import json

from rest_framework import status
from rest_framework.reverse import reverse

from taxinod.core.tests import APITestCase

from .factories import TaxiRouteFactory, TaxiStopFactory


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


class TestTaxiSearchAPI(APITestCase):
    def setUp(self):
        self.stop1 = TaxiStopFactory()
        self.stop2 = TaxiStopFactory()
        self.stop3 = TaxiStopFactory()
        self.stop4 = TaxiStopFactory()
        TaxiRouteFactory(origin=self.stop1, destination=self.stop4)
        TaxiRouteFactory(origin=self.stop1, destination=self.stop2)
        TaxiRouteFactory(origin=self.stop2, destination=self.stop4)
        TaxiRouteFactory(origin=self.stop2, destination=self.stop3)
        TaxiRouteFactory(origin=self.stop4, destination=self.stop1)

    def test_search(self):
        """
        Ensure we can search for taxi routes
        """
        url = "{}?from={}&to={}".format(
            reverse("api:taxi-search"), self.stop1.id, self.stop4.id
        )
        response = self.client.get(url)
        data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), 2)

    def test_search_empty(self):
        """
        Ensure we have no results when no route exists.
        """
        url = "{}?from={}&to={}".format(
            reverse("api:taxi-search"), self.stop3.id, self.stop4.id
        )
        response = self.client.get(url)
        data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), 0)

    def test_search_bad_request(self):
        """
        Ensure we have a bad request error when the params are not correct.
        """
        stop = TaxiStopFactory(is_active=False)
        url = "{}?from={}&to={}".format(
            reverse("api:taxi-search"), self.stop1.id, stop.id
        )
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
