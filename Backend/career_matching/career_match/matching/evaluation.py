from sklearn.metrics import precision_score

def evaluate_matching(user_id, actual_career):
    """Evaluate the accuracy of career matching using Precision@K"""
    
    user, predicted_careers = match_careers(user_id)

    if user is None:
        return None

    predicted_list = predicted_careers["career_name"].tolist()

    # Check if actual career is in the top 5 predictions
    precision_at_k = 1 if actual_career in predicted_list else 0

    return {
        "user": user.name,
        "actual_career": actual_career,
        "predicted_careers": predicted_list,
        "precision@5": precision_at_k
    }
