from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

API_KEY = 'a461e08a31b99c4052f2aa9ca36cc4b8'
from django.shortcuts import render

def frontend(request):
    return render(request, "index.html")

@api_view(['GET'])
def get_weather(request):
    city = request.GET.get('city')
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()
     # ✅ Handle invalid city
    if response.status_code != 200:
        return Response(
            {"error": data.get("message", "City not found")},
            status=404
        )

    return Response({
        "city": city,
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"]
    })
