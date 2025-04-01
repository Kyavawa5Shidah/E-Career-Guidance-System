from .views import UserProfileListCreate, CareerListCreate, register_user, get_brighter_monday_jobs
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .models import *
from .serializers import *
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('trigger-scraping/', views.trigger_scraping, name='trigger-scraping'),
    path('users/', UserProfileListCreate.as_view(), name='user_profiles'),
    path('careers/', CareerListCreate.as_view(), name='careers'),
    path('jobs/', get_brighter_monday_jobs, name='brightermonday-jobs'),
    path('register/', register_user, name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
