from django.urls import path
from .views import assess_skills

urlpatterns = [
    path('api/assess-skills/', assess_skills, name="assess_skills"),
]
