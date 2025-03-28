
from django.test import TestCase
from matching.models import UserProfile, Career
from matching.feature_extraction import preprocess_data
from matching.similarity import compute_similarity
from django.urls import reverse
import json


#Testing user profile and career data
class CareerMatchingTests(TestCase):

    def setUp(self):
        """Set up test data for user profile and career dataset"""

        # Create test careers
        self.career1 = Career.objects.create(
            career_name="Software Engineer",
            description="Develop software applications.",
            required_skills="Python, Django, REST API",
            qualifications="Bachelor's Degree",
            industry_type="Technology"
        )

        self.career2 = Career.objects.create(
            career_name="Data Scientist",
            description="Analyze data to extract insights.",
            required_skills="Python, Machine Learning, SQL",
            qualifications="Master's Degree",
            industry_type="Technology"
        )

        # Create test user profile
        self.user = UserProfile.objects.create(
            user_id=1,
            name="John Doe",
            age=25,
            gender="Male",
            education_level="Bachelor's Degree",
            experience=3,
            career_preference="Software Engineer",
            skills="Python, Django"
        )


# Test Feature Extraction
    def test_preprocess_data(self):
        """Test feature extraction from user and career data"""
        
        user, career_df, user_vector, career_vectors = preprocess_data(self.user.user_id)
        
        self.assertIsNotNone(user)
        self.assertIsNotNone(career_df)
        self.assertIsNotNone(user_vector)
        self.assertIsNotNone(career_vectors)

        # Ensure the data contains expected fields
        self.assertIn("career_name", career_df.columns)
        self.assertIn("required_skills", career_df.columns)
        self.assertIn("description", career_df.columns)


#Test career matching similarity
    def test_preprocess_data(self):
        """Test feature extraction from user and career data"""
        
        user, career_df, user_vector, career_vectors = preprocess_data(self.user.user_id)
        
        self.assertIsNotNone(user)
        self.assertIsNotNone(career_df)
        self.assertIsNotNone(user_vector)
        self.assertIsNotNone(career_vectors)

        # Ensure the data contains expected fields
        self.assertIn("career_name", career_df.columns)
        self.assertIn("required_skills", career_df.columns)
        self.assertIn("description", career_df.columns)


#Test career matching API Endpoint
    def test_career_match_api(self):
        """Test the API endpoint for career matching"""
        
        response = self.client.get(reverse('match_career', args=[self.user.user_id]))  # Assuming you have the route named `match_career`
        
        self.assertEqual(response.status_code, 200)  # Ensure the request is successful
        
        data = json.loads(response.content)
        
        self.assertIn("top_career_matches", data)
        self.assertGreater(len(data["top_career_matches"]), 0)


