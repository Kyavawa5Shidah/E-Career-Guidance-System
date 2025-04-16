from rest_framework import generics
from .models import UserProfile  # Import your UserProfile model
from .serializers import UserProfileSerializer  # Import the appropriate serializer
from django.shortcuts import render
from django.http import Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.shortcuts import render
from .models import UserProfile  # Import the UserProfile model

def user_profiles_view(request):
    profiles = UserProfile.objects.all()  # Fetch all user profiles from the database
    return render(request, 'e_career_guidance/user_profiles.html', {'profiles': profiles})

@api_view(['GET'])
def api_user_profiles(request):
    # Retrieve all user profiles
    profiles = UserProfile.objects.all()
    
    # Serialize the profiles
    serializer = UserProfileSerializer(profiles, many=True)
    
    # Return the serialized data as a Response
    return Response(serializer.data)

# Existing CreateAPIView for creating UserProfiles
class UserProfileCreateAPIView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

# New view to display user profile by ID
def user_profile_view(request, user_id):
    try:
        # Try to fetch the UserProfile using the provided user_id
        user_profile = UserProfile.objects.get(id=user_id)
    except UserProfile.DoesNotExist:
        # If not found, raise a 404 error
        raise Http404("User profile not found")
    
    # Render the user profile details on the 'user_profile.html' template
    return render(request, 'user_profile.html', {'user_profile': user_profile})

# Home view (unchanged)
def home(request):
    return render(request, 'home.html')
