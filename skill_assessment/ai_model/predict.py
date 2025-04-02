import joblib
import numpy as np

# Load Model
model = joblib.load('ai_model/skill_model.pkl')

def identify_skill_gaps(user_skills):
    # Convert user_skills to model input format
    user_skills_array = np.array(user_skills).reshape(1, -1)
    
    # Predict missing skills
    predicted_skills = model.predict(user_skills_array)
    
    return set(predicted_skills) - set(user_skills)
