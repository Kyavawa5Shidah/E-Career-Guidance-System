import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report
import joblib

# Load dataset
df = pd.read_csv('dataset/skills_data.csv')

# Convert categorical data to numerical
df['skill_type'] = df['skill_type'].astype('category').cat.codes  

# Features & Labels
X = df[['skill_id', 'skill_type']]
y = df['skill_name']

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Compute Confusion Matrix
conf_matrix = confusion_matrix(y_test, y_pred)

# Display Confusion Matrix
print("Confusion Matrix:")
print(conf_matrix)

# Classification Report (Optional)
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Save Model
joblib.dump(model, 'ai_model/skill_model.pkl')

print("\nModel trained and saved successfully.")
