"""
URL configuration for career_match project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from matching.views import match_career, career_match_results, evaluate_match, test_db_connection, test_user_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path("match/<int:user_id>/", match_career, name="match_career"),
    path("match/<int:user_id>/", career_match_results, name="career_match_results"),
    path("evaluate/<int:user_id>/<str:actual_career>/", evaluate_match, name="evaluate_match"),
    path("test-db/", test_db_connection, name="test_db"),
    path("test-user/<int:user_id>/", test_user_data, name="test_user"),
    path('match/<int:user_id>/', match_career, name='match_career'),
]
