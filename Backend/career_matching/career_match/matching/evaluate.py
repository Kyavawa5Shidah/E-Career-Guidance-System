# career_app/ml/evaluate_model.py

import pandas as pd
import joblib
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import seaborn as sns
import matplotlib.pyplot as plt

# Load test data (this assumes you split and saved test data earlier — if not, repeat your train_test_split here)
df = pd.read_csv("cleaned_userprofile_data.csv")

# Load necessary transformers
scaler = joblib.load("career_app/ml/scaler.pkl")
skills_encoder = joblib.load("career_app/ml/skills_encoder.pkl")

# Prepare X and y
X = df.drop(columns=["actual_career"])
y = df["actual_career"]

# Scale numerical features if needed (e.g. age, experience)
numerical_cols = ["age", "experience"]
X[numerical_cols] = scaler.transform(X[numerical_cols])

# Load models
rf_model = joblib.load("career_app/ml/rf_model.pkl")
lr_model = joblib.load("career_app/ml/lr_model.pkl")

# Predict using both models
rf_predictions = rf_model.predict(X)
lr_predictions = lr_model.predict(X)

# --- Evaluation: Random Forest ---
print("🔍 Random Forest Evaluation:")
print("Accuracy:", accuracy_score(y, rf_predictions))
print("Classification Report:\n", classification_report(y, rf_predictions))
print("Confusion Matrix:")
sns.heatmap(confusion_matrix(y, rf_predictions), annot=True, fmt='d')
plt.title("Random Forest Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()

# --- Evaluation: Logistic Regression ---
print("🔍 Logistic Regression Evaluation:")
print("Accuracy:", accuracy_score(y, lr_predictions))
print("Classification Report:\n", classification_report(y, lr_predictions))
print("Confusion Matrix:")
sns.heatmap(confusion_matrix(y, lr_predictions), annot=True, fmt='d', cmap="YlGnBu")
plt.title("Logistic Regression Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.show()
