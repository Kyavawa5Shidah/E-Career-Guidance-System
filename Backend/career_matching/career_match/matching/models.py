from django.db import models

class UserProfile(models.Model):
    user_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    education_level = models.CharField(max_length=100)
    experience = models.IntegerField()
    career_preference = models.TextField()
    skills = models.TextField(null=True, blank=True) 

    def __str__(self):
        return self.name

class Career(models.Model):
    career_name = models.CharField(max_length=255)
    description = models.TextField()
    required_skills = models.TextField()
    qualifications = models.TextField()
    industry_type = models.CharField(max_length=255)

    def __str__(self):
        return self.career_name
