from django.urls import path
from . import views
from .views import UserProfileCreateView


urlpatterns = [
    path('profile/', views.user_profile_view, name='user-profile'),
    path('api/profiles/', views.api_user_profiles, name='user-profiles-api'),
    path('create-profile/', UserProfileCreateView.as_view(), name='user-profile-create'),
    
]
