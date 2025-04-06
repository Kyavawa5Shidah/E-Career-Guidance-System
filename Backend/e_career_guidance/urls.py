from django.contrib import admin
from django.urls import path, include
from . import views  # Assuming views are imported for any local URLs

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin URL
    path('profiles/', include('profiles.urls')),  # Include profiles URLs
    path('api/user/create/', views.UserProfileCreateAPIView.as_view(), name='create_user_profile'),  # API for creating user profile
    path('profiles/view/<int:user_id>/', views.user_profile_view, name='user_profile_view'),  # View user profile by ID
    path('api/profiles/', views.api_user_profiles, name='api_user_profiles'),  # Endpoint for listing user profiles
    path('', views.home, name='home'),  # Home URL
    path('profiles/', views.user_profiles_view, name='user_profiles'),
]
