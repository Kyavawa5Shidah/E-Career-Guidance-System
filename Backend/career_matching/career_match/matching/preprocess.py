import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
import os
from django.conf import settings

# Load dataset
file_path = os.path.join(settings.BASE_DIR, "career_data.csv")  # Update with correct path
career_data = pd.read_csv(file_path, encoding="ISO-8859-1")

# Check for missing values and fill them
career_data.fillna("", inplace=True)

# TF-IDF Vectorization for text-based columns
tfidf_vectorizer = TfidfVectorizer(stop_words="english", max_features=100)
career_data["Description_Vectorized"] = list(tfidf_vectorizer.fit_transform(career_data["Description"]).toarray())
career_data["Required_skills_Vectorized"] = list(tfidf_vectorizer.fit_transform(career_data["Required_skills"]).toarray())
career_data["Qualifications_Vectorized"] = list(tfidf_vectorizer.fit_transform(career_data["Qualifications"]).toarray())

# Label Encoding for Industry Type
label_encoder = LabelEncoder()
career_data["Industry_type_encoded"] = label_encoder.fit_transform(career_data["Industry_type"])

# Save the processed dataset
processed_file_path = os.path.join(settings.BASE_DIR, "processed_career_data.csv")
career_data.to_csv(processed_file_path, index=False)

print("Data Preprocessing Completed. Processed file saved at:", processed_file_path)
