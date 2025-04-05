from django.urls import path
from . import views
from .views import UserProfileCreateAPIView  # ✅ Correct class

urlpatterns = [
    path('profile/', views.user_profile_view, name='user-profile'),
    path('api/profiles/', views.api_user_profiles, name='user-profiles-api'),
    path('api/create-profile/', UserProfileCreateAPIView.as_view(), name='user-profile-create'),  # ✅ DRF-based
]
