from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from matching.feature_extraction import preprocess_data

def compute_similarity(user_id):
    """Compute similarity between user's preferences and career dataset"""

    # Extract features
    user, career_df, user_vector, career_vectors = preprocess_data(user_id)

    if user is None:
        return None, None

    # Compute cosine similarity
    similarities = cosine_similarity(user_vector, career_vectors)

    # Convert similarity scores to a structured list
    career_df["similarity_score"] = similarities[0]
    
    # Sort careers by highest similarity
    career_df_sorted = career_df.sort_values(by="similarity_score", ascending=False)

    # Return the top 5 matches along with relevant details
    return user, career_df_sorted[["career_name", "description", "required_skills", "qualifications", "industry_type", "similarity_score"]].head(5)
