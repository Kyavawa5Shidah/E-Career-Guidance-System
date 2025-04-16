from django.urls import path
from .views import match_careers

urlpatterns = [
    path('api/match-careers/', match_careers, name='match-careers'),
]
