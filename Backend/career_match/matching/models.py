from django.db import models

class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    education_level = models.CharField(max_length=100)
    experience = models.FloatField()
    career_preference = models.CharField(max_length=100)
    skills = models.TextField()
    actual_career = models.CharField(max_length=100, null=True, blank=True)

class PredictionResult(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    predicted_career = models.CharField(max_length=100)
    confidence_score = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Career(models.Model):
    career_name = models.CharField(max_length=255)
    description = models.TextField()
    required_skills = models.TextField() 
    qualifications = models.TextField()
    industry_type = models.CharField(max_length=255) # Assuming this is a list of skills (could be a CSV or JSON)
    

    def __str__(self):
        return self.career_name
