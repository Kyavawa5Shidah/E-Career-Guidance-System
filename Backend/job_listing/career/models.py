from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    education_level = models.CharField(max_length=100)
    skills = models.TextField()
    interests = models.TextField()
    preferred_careers = models.ManyToManyField('Career', blank=True)

class Career(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    required_skills = models.TextField()
    average_salary = models.DecimalField(max_digits=10, decimal_places=2)


class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    job_type = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    requirements = models.TextField(null=True, blank=True)
    salary = models.CharField(max_length=100, null=True, blank=True)
    url = models.URLField(max_length=500)
    posted_date = models.DateField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} at {self.company}"

    class Meta:
        ordering = ['-created_at']
