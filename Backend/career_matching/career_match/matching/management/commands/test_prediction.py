from django.core.management.base import BaseCommand
import pandas as pd
import joblib
import numpy as np
from sklearn.preprocessing import StandardScaler
from matching.models import UserProfile, PredictionResult  # Replace with your actual model names

class Command(BaseCommand):
    help = 'Test career prediction using latest user input'

    def handle(self, *args, **kwargs):
        # 1. Load encoders and model
        model = joblib.load('matching/rf.pkl')
        skills_encoder = joblib.load('matching/skills_encoder.pkl')
        scaler = joblib.load('matching/scaler.pkl')
        career_label_encoder = joblib.load('matching/career_label_encoder.pkl')

        # 2. Get latest user profile
        user = UserProfile.objects.latest('id')

        # 3. Preprocess user input
        skills = user.skills.lower().replace(',', ' ').split()
        skills_encoded = pd.DataFrame(skills_encoder.transform([skills]), columns=skills_encoder.classes_)

        experience_scaled = scaler.transform([[user.experience]])

        # Prepare input features
        features = pd.DataFrame([{
            'career_preference': user.career_preference,
            'education_level': user.education_level,
            'experience': experience_scaled[0][0]
        }])

        # Combine with encoded skills
        full_input = pd.concat([features.reset_index(drop=True), skills_encoded.reset_index(drop=True)], axis=1)

        # Align input columns with training model
        X_columns = model.named_steps['classifier'].feature_importances_.argsort()
        try:
            full_input = full_input[model.named_steps['classifier'].feature_importances_.argsort()]
        except:
            pass  # Optional: ensure columns match trained model input if needed

        # 4. Predict
        probs = model.predict_proba(full_input)
        pred_index = np.argmax(probs)
        confidence = probs[0][pred_index]
        predicted_class = model.predict(full_input)[0]
        predicted_label = career_label_encoder.inverse_transform([predicted_class])[0]

        # 5. Save prediction to DB
        PredictionResult.objects.create(
            user=user,
            predicted_career=predicted_label,
            confidence_score=round(confidence, 2)
        )

        self.stdout.write(self.style.SUCCESS(f"Predicted Career: {predicted_label}, Confidence: {round(confidence, 2)}"))
