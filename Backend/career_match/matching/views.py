import json
import pandas as pd
import joblib
import os
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import traceback

# Load the career dataset
def load_career_dataset():
    """Load the career dataset with descriptions, required skills, and industry types"""
    try:
        # Update this path to where your career dataset is stored
        career_dataset_path = os.path.join("C:/Users/SHIRAH/Desktop/Test/career_matching/career_match/career_data.csv")
        career_df = pd.read_csv(career_dataset_path, encoding='latin1')
        return career_df
    except Exception as e:
        print(f"Error loading career dataset: {str(e)}")
        # Return a minimal dataset if the file can't be loaded
        return pd.DataFrame({
            'career_name': [],
            'description': [],
            'required_skills': [],
            'industry_type': []
        })

# Load the ML model and encoders
def load_models():
    """Load all the trained models and encoders"""
    model_dir = os.path.join(settings.BASE_DIR, 'matching/model')
    
    model = joblib.load(os.path.join(model_dir, "rf_model.pkl"))
    skills_encoder = joblib.load(os.path.join(model_dir, "skills_encoder.pkl"))
    interests_encoder = joblib.load(os.path.join(model_dir, "interests_encoder.pkl"))
    education_encoder = joblib.load(os.path.join(model_dir, "education_encoder.pkl"))
    target_encoder = joblib.load(os.path.join(model_dir, "target_encoder.pkl"))
    feature_names = joblib.load(os.path.join(model_dir, "feature_names.pkl"))
    
    return model, skills_encoder, interests_encoder, education_encoder,  target_encoder, feature_names

# Preprocess user input for prediction
def preprocess_input(user_input, skills_encoder, interests_encoder, education_encoder, feature_names):
    """Convert user input to the format expected by the model"""
    # Extract user input
    age = user_input.get('age', 25)
    education = user_input.get('education', "bachelor's")
    skills = [skill.lower().strip() for skill in user_input.get('skills', [])]
    interests = [interest.lower().strip() for interest in user_input.get('interests', [])]

    # Encode skills
    skills_df = pd.DataFrame(columns=skills_encoder.classes_)
    skills_df.loc[0] = 0
    for skill in skills:
        if skill in skills_encoder.classes_:
            skills_df.loc[0, skill] = 1
        else:
            print(f"⚠️ Unknown skill: {skill}")  # Handle unknown skills

    # Encode interests
    interests_df = pd.DataFrame(columns=interests_encoder.classes_)
    interests_df.loc[0] = 0
    for interest in interests:
        if interest in interests_encoder.classes_:
            interests_df.loc[0, interest] = 1
        else:
            print(f"⚠️ Unknown interest: {interest}")  # Handle unknown interests

    print(f"Available education levels: {education_encoder.classes_}")
    education_cleaned = education.strip()
    education_value = education_encoder.transform([education_cleaned])[0]
    education_df = pd.DataFrame([[education_value]], columns=['education_encoded'])

    # Combine features
    X = pd.concat([skills_df.reset_index(drop=True),
                    interests_df.reset_index(drop=True),
                    education_df.reset_index(drop=True)], axis=1)

    # Remove duplicate columns in X
    X = X.loc[:, ~X.columns.duplicated()]

    print("Prediction DataFrame Columns:")
    print(X.columns.tolist())

    print("Feature Names From Training:")
    print(feature_names)
    missing_cols = set(feature_names) - set(X.columns)
    extra_cols = set(X.columns) - set(feature_names)

    if missing_cols:
        print("⚠️ Missing columns in prediction data:", missing_cols)
    if extra_cols:
        print("⚠️ Extra columns in prediction data:", extra_cols)

    X = X.reindex(columns=feature_names, fill_value=0)

    # Final check
    assert list(X.columns) == feature_names, "❌ Feature order mismatch!"

    return X


# Get career details from the dataset
def get_career_details(career_name, career_df):
    """Get description, required skills, and industry type for a career"""
    # Find the career in the dataset (case-insensitive)
    print(career_df.columns)

    career_df['career_name'] = career_df['career_name'].astype(str)

    career_row = career_df[career_df['career_name'].str.lower() == career_name.lower()]
    
    if not career_row.empty:
        # Get the first matching row
        row = career_row.iloc[0]
        
        # Parse required skills if they're stored as a string
        required_skills = row.get('required_skills', '')
        if isinstance(required_skills, str):
            try:
                # Try to parse as JSON
                required_skills = json.loads(required_skills)
            except:
                # If that fails, split by comma
                required_skills = [skill.strip() for skill in required_skills.split(',')]
        
        return {
            'description': row.get('description', 'No description available'),
            'required_skills': required_skills if isinstance(required_skills, list) else [],
            'industry_type': row.get('industry_type', 'Not specified')
        }
    else:
        # Return default values if career not found
        return {
            'description': 'No description available',
            'required_skills': [],
            'industry_type': 'Not specified'
        }

@csrf_exempt
def predict_career(request):
    """API endpoint to predict careers based on user input"""
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
    try:
        # Parse JSON data from request
        data = json.loads(request.body)
        
        # Load models and career dataset
        model, skills_encoder, interests_encoder, education_encoder, target_encoder, feature_names = load_models()
        career_df = load_career_dataset()
        
        # Preprocess input
        X = preprocess_input(data, skills_encoder, interests_encoder, education_encoder, feature_names)
        
        # Make prediction
        probabilities = model.predict_proba(X)
        
        # Get top 3 predictions
        top_n = 3
        top_indices = np.argsort(probabilities[0])[::-1][:top_n]
        top_probabilities = probabilities[0][top_indices]
        
        # Convert indices to career names
        top_careers = target_encoder.inverse_transform(top_indices)
        
        # Create results with career details
        recommendations = []
        for i, (career, probability) in enumerate(zip(top_careers, top_probabilities)):
            # Get career details from dataset
            career_details = get_career_details(career, career_df)
            
            # Find matching skills and interests for explanation
            matching_skills = [skill for skill in data.get('skills', []) 
                              if skill.lower() in skills_encoder.classes_]
            matching_interests = [interest for interest in data.get('interests', []) 
                                 if interest.lower() in interests_encoder.classes_]
            
            # Create explanation
            explanation = {
                "skills": matching_skills[:3],  # Top 3 matching skills
                "interests": matching_interests[:3],  # Top 3 matching interests
                "education_match": True  # Simplified for this example
            }
            
            recommendations.append({
                "title": career,
                "matchScore": round(float(probability) * 1000), 
                "description": career_details['description'],
                "requiredSkills": career_details['required_skills'],
                "industryType": career_details['industry_type'],
                "explanation": explanation
            })
        
        return JsonResponse({'recommendations': recommendations})
    
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        traceback.print_exc()
        return JsonResponse({'error': str(e)}, status=500)