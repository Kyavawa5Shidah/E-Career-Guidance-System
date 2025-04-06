from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from e_career_guidance.models import UserProfile
from e_career_guidance.serializers import UserProfileSerializer  # Ensure this serializer is defined!

# 🔹 DRF API-based UserProfile creation
class UserProfileCreateAPIView(APIView):
    def post(self, request):
        # Deserialize the incoming request data
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()  # Save the new user profile
            return Response({
                "message": "User profile created", 
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        # Return errors if the data is invalid
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

        # Check if all necessary fields are present
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

# 🔹 View a single user profile (template rendering)
def user_profile_view(request):
    user_profile = UserProfile.objects.first()  # Fetch the first user profile (you can adjust as needed)
    return render(request, 'profiles/profile.html', {'profile': user_profile})

# 🔹 View all profiles via API
def api_user_profiles(request):
    profiles = UserProfile.objects.all()  # Get all user profiles from the database
    data = list(profiles.values())  # Convert the queryset into a list of dictionaries
    return JsonResponse(data, safe=False)

