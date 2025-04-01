from rest_framework import generics
from .models import *
from .serializers import UserProfileSerializer, CareerSerializer, JobSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets, filters
from .tasks import scrape_jobs_task
from django_filters.rest_framework import DjangoFilterBackend
from .scraper import scrape_brighter_monday


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows jobs to be viewed.
    """
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['job_type', 'location', 'company']
    search_fields = ['title', 'description', 'company', 'location']
    ordering_fields = ['posted_date', 'created_at', 'title']
    ordering = ['-created_at']

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def trigger_scraping(request):
    """
    Endpoint to manually trigger job scraping
    """
    task = scrape_jobs_task.delay()
    return Response({"message": "Job scraping started", "task_id": task.id})


@api_view(["GET"])
def get_brighter_monday_jobs(request):
    jobs = scrape_brighter_monday() 
    return Response(jobs)


@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)
    
    user = User.objects.create_user(username=username, password=password)
    return Response({'message': 'User registered successfully'})


class UserProfileListCreate(generics.ListCreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

class CareerListCreate(generics.ListCreateAPIView):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

