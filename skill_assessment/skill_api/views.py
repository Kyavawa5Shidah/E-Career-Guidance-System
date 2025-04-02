from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import UserAssessment
from ai_model.predict import identify_skill_gaps
from ai_model.resources import fetch_learning_resources
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to the E-Career Guidance System !")


@api_view(['POST'])
def assess_skills(request):
    user_skills = request.data.get('skills', [])
    missing_skills = identify_skill_gaps(user_skills)
    recommendations = fetch_learning_resources(missing_skills)
    
    return Response({"missing_skills": list(missing_skills), "recommendations": recommendations})
