from rest_framework.routers import DefaultRouter

from taxinod.taxi.api.viewsets import TaxiStopViewSet

router = DefaultRouter()

router.register("stops", TaxiStopViewSet, basename="taxi-stop")

app_name = "api"
urlpatterns = router.urls
