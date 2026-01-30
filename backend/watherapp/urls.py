
from django.urls import path
from .views import get_weather,frontend

urlpatterns = [
    path("",frontend), # serve React frontend
    path("weather/",get_weather ),
]

