import numpy as np
from matching.similarity import compute_similarity

def match_careers(user_id, weight_skills=0.5, weight_qualifications=0.3, weight_industry=0.2):
    """Match careers based on weighted cosine similarity scoring"""

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

    # Return top 5 matches
    return user, career_df_sorted[["career_name", "confidence_score"]].sort_values(by="confidence_score", ascending=False).head(3)
