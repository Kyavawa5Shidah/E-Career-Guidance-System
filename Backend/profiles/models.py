from django.db import models

class UserProfile(models.Model):
    # Basic User Information
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)  # Linked to the built-in Django User model
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()  # Age field
    gender_choices = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    gender = models.CharField(max_length=1, choices=gender_choices, default='M')  # Gender field
    education_level_choices = [
        ('HS', 'High School'),
        ('BA', 'Bachelors'),
        ('MA', 'Masters'),
        ('PHD', 'PhD'),
    ]
    education_level = models.CharField(max_length=3, choices=education_level_choices, default='BA')  # Education level field
    career_preferences = models.TextField(blank=True, null=True)  # Career preferences field (could be a text field)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
