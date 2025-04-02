from django.shortcuts import render
from django.views import View
from django.http import JsonResponse
from .models import UserProfile
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile


class UserProfileCreateView(View):
    def post(self, request):
        name = request.POST.get("name")
        age = request.POST.get("age")

        if name and age:  # Ensure data exists
            user_profile = UserProfile.objects.create(name=name, email=age)
            return JsonResponse({"message": "User profile created"}, status=201)
        
        return JsonResponse({"error": "Invalid data"}, status=400)
    

class UserProfileCreateView(CreateView):
    model = UserProfile
    fields = ['name', 'age', 'experience', 'gender', 'education_level', 'career_preferences']
    template_name = 'profiles/profile_form.html'
    success_url = reverse_lazy('home')  # Adjust accordingly

def user_profile_view(request):
    user_profile = UserProfile.objects.first()  # Assuming you want the first user profile
    return render(request, 'profiles/profile.html', {'profile': user_profile})

def api_user_profiles(request):
    profiles = UserProfile.objects.all()
    data = list(profiles.values())  # Convert queryset to a list of dictionaries
    return JsonResponse(data, safe=False)

    class UserProfileCreateView(APIView):
     def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)  # Ensure 201 is returned
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
