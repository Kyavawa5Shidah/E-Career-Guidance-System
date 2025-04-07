from django.http import JsonResponse
from matching.models import UserProfile, Career, PredictionResult
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from django.db.models import QuerySet  

# Load the model and encoders
model = joblib.load("matching/rf.pkl")
skills_encoder = joblib.load("matching/skills_encoder.pkl")
scaler = joblib.load("matching/scaler.pkl")
career_label_encoder = joblib.load("matching/career_label_encoder.pkl")

def preprocess_and_predict(user: UserProfile, career_data: QuerySet):
    # Convert user skills to list and encode
    raw_skills = user.skills.lower().replace(",", " ").split()
    skills_encoded = skills_encoder.transform([raw_skills])
    skills_df = pd.DataFrame(skills_encoded, columns=skills_encoder.classes_)
    print("Encoded Skills:", skills_encoded)


    # Get the list of features the model expects
    expected_features = model.feature_names_in_

    # Add missing columns to skills_df (if any)
    missing_columns = set(expected_features) - set(skills_df.columns)
    for column in missing_columns:
        skills_df[column] = 0  # Default value for missing columns

    # Ensure the columns in skills_df are in the correct order
    skills_df = skills_df[expected_features]

    # Extract relevant career data (from the career dataset)
    career_row = career_data.filter(career_name=user.career_preference).first()  # Get the first match (or None if no match)

    # Ensure that the career data is available
    if career_row is None:
        raise ValueError("No matching career data found for user profile.")

    # Prepare the DataFrame with user and career data for prediction
    df = pd.DataFrame([{
        "education_level": user.education_level,
        "career_preference": user.career_preference,
        "experience": user.experience,
        "career_name": career_row.career_name,
        "industry_type": career_row.industry_type,
        "qualifications": career_row.qualifications,
        "required_skills": career_row.required_skills
    }])

    # Encode categorical fields
    le = LabelEncoder()
    df["career_name"] = le.fit_transform(df["career_name"])
    df["education_level"] = le.fit_transform(df["education_level"])
    df["career_preference"] = le.fit_transform(df["career_preference"])
    df["required_skills"] = le.fit_transform(df["required_skills"])
    df["qualifications"] = le.fit_transform(df["qualifications"])
    df["industry_type"] = le.fit_transform(df["industry_type"])

    # Separate numerical columns from categorical columns
    numerical_cols = ["experience"]  # Only use experience as it's numeric
    categorical_cols = ["education_level", "career_preference", "career_name", "industry_type", "qualifications", "required_skills"]

    # Scale only numerical columns
    df[numerical_cols] = scaler.transform(df[numerical_cols])
   


    # Add missing columns to df
    missing_columns = set(expected_features) - set(df.columns)
    for column in missing_columns:
        df[column] = 0  # Add default value for missing columns

    # Merge all features (user data + skills data)
    final_input = pd.concat([df, skills_df], axis=1)

    # Ensure the final_input has the same columns as the model was trained with
    final_input = final_input.loc[:, ~final_input.columns.duplicated()]  # Remove duplicate columns
    final_input = final_input.reindex(columns=model.feature_names_in_, fill_value=0)

    # Check if the columns match
    if final_input.shape[1] != len(model.feature_names_in_):
        raise ValueError(f"Mismatch in number of features: Expected {len(model.feature_names_in_)} but got {final_input.shape[1]}")

    # Predict
    pred = model.predict(final_input)[0]
    probs = model.predict_proba(final_input)[0]
    confidence = max(probs)
    predicted_career = career_label_encoder.inverse_transform([pred])[0]

    return predicted_career, confidence

def get_user_from_request(request):
    """
    Placeholder function to get the user from the request.
    Depending on your authentication method, this could be based on session, JWT, etc.
    """
    user_id = request.user.id  # Example: if you're using Django's built-in User model and authentication
    user = UserProfile.objects.get(id=user_id)  # Fetch the user profile
    return user

def predict_career(request, user_id):
    try:
        # Get user profile based on the user_id passed in the URL
        user = UserProfile.objects.get(id=user_id)

        # Get career data from the Career model based on the user's career preference
        career_data = Career.objects.filter(
            career_name=user.career_preference
        )

        # Ensure career data is available
        if not career_data.exists():
            return JsonResponse({"error": "No matching career data found for the user preferences"}, status=404)

        # Call the prediction function with both user and career data
        predicted_career, confidence = preprocess_and_predict(user, career_data)

        # Save the prediction result to the database
        prediction_result = PredictionResult.objects.create(
            user=user,
            predicted_career=predicted_career,
            confidence_score=confidence
        )

        # Return a JSON response with the predicted career and confidence score
        return JsonResponse({
            "predicted_career": predicted_career,
            "confidence": round(confidence, 2)
        })
    
    except UserProfile.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
    except ValueError as ve:
        return JsonResponse({"error": str(ve)}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
