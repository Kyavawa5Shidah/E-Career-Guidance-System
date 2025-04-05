from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer  # You need to create this!

# 🔹 DRF API-based UserProfile creation
class UserProfileCreateAPIView(APIView):
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User profile created", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 🔹 Optional: HTML form handling via Django View (if you're using forms in template)
class UserProfileFormView(View):
    def post(self, request):
        name = request.POST.get("name")
        age = request.POST.get("age")
        gender = request.POST.get("gender")
        education_level = request.POST.get("education_level")
        experience = request.POST.get("experience")
        career_preference = request.POST.get("career_preference")

        if all([name, age, gender, education_level, experience, career_preference]):
            UserProfile.objects.create(
                name=name,
                age=age,
                gender=gender,
                education_level=education_level,
                experience=experience,
                career_preference=career_preference
            )
            return JsonResponse({"message": "User profile created"}, status=201)

        return JsonResponse({"error": "Incomplete data"}, status=400)

# 🔹 View user profile (template rendering)
def user_profile_view(request):
    user_profile = UserProfile.objects.first()
    return render(request, 'profiles/profile.html', {'profile': user_profile})

# 🔹 View all profiles via API
def api_user_profiles(request):
    profiles = UserProfile.objects.all()
    data = list(profiles.values())
    return JsonResponse(data, safe=False)
