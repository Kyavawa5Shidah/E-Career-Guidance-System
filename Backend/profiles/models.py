from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=20)
    education_level = models.JSONField()  # Storing education as a JSON field
    experience = models.CharField(max_length=500)
    career_preferences = models.CharField(max_length=255)

    def __str__(self):
        return self.name
