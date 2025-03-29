import numpy as np
from matching.similarity import compute_similarity
from .models import CareerMatchResult  # Import your Django model

def match_careers(user_id, weight_skills=0.5, weight_qualifications=0.3, weight_industry=0.2):
    """Match careers based on weighted cosine similarity scoring and store results in the database"""

    user, career_df_sorted = compute_similarity(user_id)

    if user is None:
        return None, None

    # Normalize similarity scores to range [0, 1]
    max_sim = career_df_sorted["similarity_score"].max()
    if max_sim > 0:
        career_df_sorted["similarity_score"] = career_df_sorted["similarity_score"] / max_sim

    # Compute weighted score
    career_df_sorted["confidence_score"] = (
        (career_df_sorted["similarity_score"] * weight_skills) +
        (career_df_sorted["similarity_score"] * weight_qualifications) +
        (career_df_sorted["similarity_score"] * weight_industry)
    )

    # Select top 3 matches
    top_matches = career_df_sorted[["career_name", "description", "required_skills", "confidence_score"]].sort_values(by="confidence_score", ascending=False).head(3)

    # Clear previous results for the user
    CareerMatchResult.objects.filter(user_id=user_id).delete()

    # Save new results to the database
    for _, row in top_matches.iterrows():
        CareerMatchResult.objects.create(
            user_id=user_id,
            career_name=row["career_name"],
            description=row["description"],
            required_skills=row["required_skills"],
            confidence_score=row["confidence_score"]
        )

    return user, top_matches
