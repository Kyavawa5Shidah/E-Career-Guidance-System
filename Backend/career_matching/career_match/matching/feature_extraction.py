import pandas as pd
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from matching.models import UserProfile, Career

def get_user_profile(user_id):
    """Fetch user profile from MySQL database"""
    try:
        return UserProfile.objects.get(user_id=user_id)
    except UserProfile.DoesNotExist:
        return None

def get_career_data():
    """Fetch all careers from MySQL database"""
    return Career.objects.all()

def preprocess_data(user_id):
    """Extract features from user and career dataset for matching"""

    # Fetch user data from DB
    user = get_user_profile(user_id)
    if not user:
        return None, None, None, None

    # Fetch career data
    careers = get_career_data()
    career_df = pd.DataFrame(list(careers.values()))

    # Encode categorical features (Education Level & Industry Type)
    education_encoder = LabelEncoder()
    industry_encoder = LabelEncoder()
    
    # Fit the encoder on all possible qualifications and industry types
    education_encoder.fit(career_df["qualifications"].unique().tolist() + [user.education_level])
    industry_encoder.fit(career_df["industry_type"].unique().tolist())

    # Encode the career data qualifications and industry types
    career_df["qualifications"] = education_encoder.transform(career_df["qualifications"])
    career_df["industry_type"] = industry_encoder.transform(career_df["industry_type"])
    
    # Apply encoding to user's education level
    user_education_encoded = education_encoder.transform([user.education_level])[0] if user.education_level in education_encoder.classes_ else -1
    user.education_level = user_education_encoded  # Set the user education level to the encoded value

    # Normalize numerical features (Experience)
    scaler = MinMaxScaler()
    career_df[["qualifications"]] = scaler.fit_transform(career_df[["qualifications"]])
    user.experience = scaler.transform([[user.experience]])[0][0]

    # Convert text data to numerical features (TF-IDF) for career description and required skills
    vectorizer = TfidfVectorizer()

    # Combine career description and required skills to create career features
    career_text_features = career_df["description"] + " " + career_df["required_skills"]
    career_vectors = vectorizer.fit_transform(career_text_features)

    # Combine user's career preference with skills (text data)
    user_skills = user.skills if user.skills else ""  # Use an empty string if no skills are provided
    user_text_features = user.career_preference + " " + user_skills  # Concatenate career preference and skills
    user_vector = vectorizer.transform([user_text_features])  # Transform user features to vector

    print("Feature Extraction Completed ✅")
    return user, career_df, user_vector, career_vectors
