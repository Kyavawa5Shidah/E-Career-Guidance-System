# signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import UserProfile
from matching.views import preprocess_and_predict


@receiver(post_save, sender=UserProfile)
def predict_after_save(sender, instance, created, **kwargs):
    if created:
        predicted_career, confidence = preprocess_and_predict(instance)
        instance.predicted_career = predicted_career
        instance.confidence_score = confidence
        instance.save()
