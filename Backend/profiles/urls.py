from django.contrib import admin
from django.urls import path, include
from . import views  # Import your views

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin URL
    # If you have a profiles app with its own urls.py, uncomment the following line
    # path('profiles/', include('profiles.urls')),  
    path('api/user/create/', views.UserProfileCreateAPIView.as_view(), name='create_user_profile'),
    path('profiles/view/', views.user_profile_view, name='user_profile_view'),
    path('api/profiles/', views.api_user_profiles, name='api_user_profiles'),

]
