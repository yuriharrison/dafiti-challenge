from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

app_name = 'api'

router = DefaultRouter()
router.register('shoes', views.ShoesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]