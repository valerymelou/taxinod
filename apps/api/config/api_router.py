from django.urls import path
from rest_framework.routers import DefaultRouter

from taxinod.taxi.api.viewsets import TaxiSearchView, TaxiStopViewSet

router = DefaultRouter()

router.register("stops", TaxiStopViewSet, basename="taxi-stop")

app_name = "api"
urlpatterns = router.urls

urlpatterns += [path("search", TaxiSearchView.as_view(), name="taxi-search")]
