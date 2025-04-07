import ast
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import MultiLabelBinarizer, StandardScaler
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
import joblib
from imblearn.combine import SMOTEENN
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from imblearn.over_sampling import SMOTE
from sklearn.utils import resample
from sklearn.metrics import classification_report, accuracy_score, precision_score, recall_score, f1_score
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score, StratifiedKFold
from imblearn.over_sampling import RandomOverSampler
from collections import Counter
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV, cross_val_score
from sklearn.metrics import classification_report, accuracy_score
import numpy as np
import pickle
from sklearn.compose import ColumnTransformer

# Load your datasets
career_data = pd.read_csv("C:/Users/SHIRAH/Desktop/career_matching/career_match/career_data.csv", encoding='latin1') # Replace with your file path
userprofile_data = pd.read_csv("C:/Users/SHIRAH/Desktop/career_matching/career_match/Userprofile_data.csv", encoding='latin1' )

# 1. Handle missing values
# UserProfile Dataset
userprofile_data.columns = userprofile_data.columns.str.strip().str.lower()
userprofile_data['skills'] = userprofile_data['skills'].fillna('Unknown')  # Fill missing skills with 'Unknown'
userprofile_data['career_preference'] = userprofile_data['career_preference'].fillna('Unknown')  # Fill missing career preference
userprofile_data['experience'] = pd.to_numeric(userprofile_data['experience'], errors='coerce') # Fill missing experience with mean
userprofile_data['education_level'] = userprofile_data['education_level'].fillna('Unknown')  # Fill missing education level

# Career Dataset
career_data.columns = career_data.columns.str.strip().str.lower()
career_data['required_skills'] = career_data['required_skills'].fillna('Unknown')  # Fill missing required skills
career_data['qualifications'] = career_data['qualifications'].fillna('Unknown')  # Fill missing qualification
career_data['industry_type'] = career_data['industry_type'].fillna('Unknown')  # Fill missing industry type

# 2. Standardize Data Formats
# Skills - Convert to lowercase and clean any extra spaces
userprofile_data['skills'] = userprofile_data['skills'].str.lower().str.replace('[^a-zA-Z0-9 ]', '').str.strip()

# Experience - Convert to numerical value (if it's in years)
userprofile_data['experience'] = userprofile_data['experience'].apply(lambda x: int(str(x).split()[0]) if isinstance(x, str) else x)

# 3. Encoding Categorical Variables
# Label Encoding for 'education_level' and 'career_preference'
label_encoder = LabelEncoder()
# Create and fit the LabelEncoder for 'actual_career'
career_label_encoder = LabelEncoder()
userprofile_data['actual_career'] = career_label_encoder.fit_transform(userprofile_data['actual_career'])
userprofile_data['education_level'] = label_encoder.fit_transform(userprofile_data['education_level'])
userprofile_data['career_preference'] = label_encoder.fit_transform(userprofile_data['career_preference'])

career_data['industry_type'] = label_encoder.fit_transform(career_data['industry_type'])
career_data['qualifications'] = label_encoder.fit_transform(career_data['qualifications'])

# 4. Feature Engineering
# For 'skills', you may want to extract individual skills (assuming skills are stored as a string of comma-separated values)
userprofile_data['skills'] = userprofile_data['skills'].str.split(',').apply(lambda x: ' '.join(set(x)))  

# 5. Remove Outliers (e.g., if experience is over a certain threshold, treat it as outlier)
userprofile_data = userprofile_data[userprofile_data['experience'] < 50]  


scaler = StandardScaler()
userprofile_data['experience'] = scaler.fit_transform(userprofile_data[['experience']])

# 7. Merge Datasets (if needed, e.g., based on 'career_name')
# Convert the columns to string type to avoid data type mismatch
userprofile_data['actual_career'] = userprofile_data['actual_career'].astype(str)
career_data['career_name'] = career_data['career_name'].astype(str)
merged_data = pd.merge(userprofile_data, career_data, left_on='actual_career', right_on='career_name', how='left')

# Save the cleaned dataset to a new CSV file if needed
merged_data.to_csv("cleaned_data.csv", index=False)

def clean_skills_column(column):
    cleaned = []
    for entry in column:
        if isinstance(entry, str):
            try:
                # Handle commas and spaces, split skills correctly
                # First, replace commas with spaces if needed
                entry = entry.replace(",", " ")  # Ensure commas are replaced with spaces
                # Split by space to separate skills
                skills = entry.split()  # Split based on whitespace
                cleaned.append([skill.strip().lower() for skill in skills if skill.strip()])  # Remove extra spaces
            except Exception as e:
                print(f"Error parsing skills: {entry} -> {e}")
                cleaned.append([])
        elif isinstance(entry, list):
            # If the skills are already in list format, just clean them
            cleaned.append([skill.strip().lower() for skill in entry])
        else:
            cleaned.append([])
    return cleaned


# Clean skills
userprofile_data['skills'] = clean_skills_column(userprofile_data['skills'])
career_data['required_skills'] = clean_skills_column(career_data['required_skills'])


# Create a consistent global skill vocabulary
all_user_skills = set(skill for sublist in userprofile_data['skills'] for skill in sublist)
all_career_skills = set(skill for sublist in career_data['required_skills'] for skill in sublist)
all_skills = sorted(list(all_user_skills.union(all_career_skills)))


# Fit MultiLabelBinarizer
mlb = MultiLabelBinarizer(classes=all_skills)
mlb.fit([all_skills])  # Fit on empty to lock in the class order

# Transform the skills columns
user_skills_encoded = pd.DataFrame(mlb.transform(userprofile_data['skills']), columns=mlb.classes_)
career_skills_encoded = pd.DataFrame(mlb.transform(career_data['required_skills']), columns=mlb.classes_)

# ===================== 4. Encode categorical features =====================
label_encoders = {}

def encode_column(df, column_name):
    le = LabelEncoder()
    df[column_name] = le.fit_transform(df[column_name].astype(str))
    label_encoders[column_name] = le
    return df

user_df = encode_column(userprofile_data, 'career_preference')
user_df = encode_column(user_df, 'education_level')

career_df = encode_column(career_data, 'qualifications')
career_df = encode_column(career_df, 'industry_type')

# ===================== 5. Normalize numerical features =====================
scaler = StandardScaler()
user_df['experience'] = scaler.fit_transform(user_df[['experience']])

# ===================== 6. Combine features into final vectors =====================
# Merge user_skills_encoded with user_df (user profile data)
user_features = pd.concat([user_df[['career_preference', 'education_level', 'experience']], user_skills_encoded], axis=1)

# Merge career_skills_encoded with career_df (career data)
career_features = pd.concat([career_df[['qualifications', 'industry_type']], career_skills_encoded], axis=1)

# ===================== 7. Optional: Merge with actual_career (if training a supervised model) =====================
if 'actual_career' in userprofile_data.columns:
    user_labels = label_encoders.get('career_name', LabelEncoder()).fit_transform(userprofile_data['actual_career'])
else:
    user_labels = None  # Use this for inference later
# ===================== 8. Merge the data for final feature matrix =====================
# Ensure the lengths match
if len(user_labels) == len(merged_data):
    merged_data['actual_career'] = user_labels
else:
    print(f"Length mismatch: merged_data has {len(merged_data)} rows, but user_labels has {len(user_labels)} entries.")
    # Optionally trim user_labels or align with merged_data

# 1. Label Encoding for 'career_name' and 'gender'
label_encoder = LabelEncoder()
merged_data['career_name'] = label_encoder.fit_transform(merged_data['career_name'])
merged_data['gender'] = label_encoder.fit_transform(merged_data['gender'])
merged_data['skills'] = label_encoder.fit_transform(merged_data['skills'])
merged_data['required_skills'] = label_encoder.fit_transform(merged_data['required_skills'])

# 2. One-Hot Encoding for 'skills' and 'industry_type' using ColumnTransformer
column_transformer = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(), ['skills', 'industry_type'])  # Columns to encode
    ],
    remainder='passthrough'  # Keep other columns as is
)
# ===================== 9. Prepare final feature matrix (X_full) =====================
# Drop the columns 'actual_career' and 'name' safely
X_full = merged_data.drop(['actual_career', 'name', 'description'], axis=1, errors='ignore')

# ===================== 10. Define target variable =====================
y_full = merged_data['actual_career'] if 'actual_career' in merged_data.columns else None  # Your target variable


# Ensure the target variable exists
if y_full is None:
    raise ValueError("Target variable 'actual_career' is missing in the data.")


# ===================== 10. Count class frequencies =====================
counter = Counter(y_full)
print("Class frequencies in y_full:", counter)

# ===================== 11. Get valid classes (>= 2 samples) =====================
valid_classes = [cls for cls, count in counter.items() if count >= 2]
print("Valid classes (>= 2 samples):", valid_classes)

# ===================== 12. Create mask for valid class rows =====================
mask = y_full.isin(valid_classes)
X_filtered = X_full[mask]
y_filtered = y_full[mask]
X_filtered = X_filtered.fillna(0)

# ===================== 13. Apply SMOTEENN or another resampling technique =====================
# Convert mixed-type columns to strings before encoding
for col in X_filtered.select_dtypes(include=['object', 'int']).columns:
    X_filtered[col] = X_filtered[col].astype(str)
    encoder = LabelEncoder()
    X_filtered[col] = encoder.fit_transform(X_filtered[col])

# Recheck class frequencies *after encoding*
final_counter = Counter(y_filtered)
final_valid_classes = [cls for cls, count in final_counter.items() if count >= 2]

# Mask again to exclude invalid classes (if any)
final_mask = y_filtered.isin(final_valid_classes)
X_filtered = X_filtered[final_mask]
y_filtered = y_filtered[final_mask]

print("Class distribution before SMOTE:", Counter(y_filtered))

ros = RandomOverSampler(random_state=42)
X_train_balanced, y_train_balanced = ros.fit_resample(X_filtered, y_filtered)
# ===================== 15. Split the filtered data into training and testing sets =====================
X_train, X_test, y_train, y_test = train_test_split(
    X_train_balanced, y_train_balanced, test_size=0.2, random_state=42, stratify=y_train_balanced
)

# 2. Feature Scaling (only on numeric columns like 'experience')
numeric_features = X_train.select_dtypes(include=['int64', 'float64']).columns.tolist()
categorical_features = X_train.select_dtypes(include=['object', 'category']).columns.tolist()

preprocessor = ColumnTransformer(
    transformers=[('num', StandardScaler(), numeric_features)],
    remainder='passthrough'
)

pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', RandomForestClassifier(random_state=42))])

# --- Feature Selection: Reduce Feature Count ---
rf = RandomForestClassifier(n_estimators=500, random_state=42)
rf.fit(X_train, y_train)

# Keep only the most important features
feature_importances = pd.Series(rf.feature_importances_, index=X_train.columns)
top_features = feature_importances.nlargest(100).index  # Keep top 100 features
X_train = X_train[top_features]
X_test = X_test[top_features]

# Align columns of X_test to match X_train
X_test = X_test[X_train.columns]


print(X_train.columns)
print(X_test.columns)


# Expanded hyperparameter grid

rf_param_grid = {
    'n_estimators': [100, 200, 500],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'max_features': ['sqrt', 'log2'],
    'class_weight': ['balanced']
}



stratified_kfold = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# GridSearchCV with expanded hyperparameter search
grid_search_rf = GridSearchCV(
    estimator=pipeline,
    param_grid={'classifier__' + key: val for key, val in rf_param_grid.items()},
    cv=stratified_kfold,
    n_jobs=-1,
    verbose=2
)



# --- Train the Model ---
grid_search_rf.fit(X_train, y_train)

# Train the Random Forest model using the best parameters found
rf = grid_search_rf.best_estimator_
rf.fit(X_train, y_train)

# --- Results ---
print("Best parameters for Random Forest:", grid_search_rf.best_params_)
# --- Model Evaluation - Classification Report
y_pred_rf = rf.predict(X_test)

# Random Forest Classification Report
print("Random Forest Classification Report:")
print(classification_report(y_test, y_pred_rf))

# --- Cross-Validation Scores for Random Forest
rf_cv_scores = cross_val_score(rf, X_train_balanced, y_train_balanced, cv=5, scoring='accuracy')
print("Random Forest CV Accuracy: ", rf_cv_scores.mean())



# --- Save Models
joblib.dump(rf, "rf.pkl")  # Save Random Forest model
joblib.dump(mlb, "skills_encoder.pkl")  # Save MultiLabelBinarizer
joblib.dump(scaler, "scaler.pkl")  # Save Scaler
joblib.dump(career_label_encoder, 'career_label_encoder.pkl')