from django.contrib.auth.models import User
from django.db import models


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    education_level = models.CharField(max_length=100)
    skills = models.TextField()
    interests = models.TextField()
    preferred_careers = models.ManyToManyField('Career', blank=True)

    def __str__(self):
        return self.user.username


class Career(models.Model):
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    required_skills = models.TextField()
    average_salary = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


class Job(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    posted_date = models.CharField(max_length=100, null=True, blank=True)
    job_url = models.URLField(unique=True, null=True, blank=True) 
    deadline = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    job_type =  models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.title} at {self.company}"

    class Meta:
        ordering = ['-created_at']
        db_table = 'joblistings'  
