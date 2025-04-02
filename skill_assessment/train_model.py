import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
df = pd.read_csv('dataset/skills_data.csv')

# Convert categorical data
df['skill_type'] = df['skill_type'].astype('category').cat.codes  

# Features & Labels
X = df[['skill_id', 'skill_type']]
y = df['skill_name']

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Save Model
joblib.dump(model, 'ai_model/skill_model.pkl')

print("Model trained and saved successfully.")
