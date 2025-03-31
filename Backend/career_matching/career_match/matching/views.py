
# Create your views here.
from django.http import JsonResponse
from matching.feature_extraction import preprocess_data
from matching.similarity import compute_similarity
from matching.evaluation import evaluate_matching
from matching.matching import match_careers
from matching.db_loader import load_career_data, load_user_data
from rest_framework.decorators import api_view


@api_view(['GET'])
def match_career(request, user_id):
    """API endpoint to return career matches for a user"""
    
    user, career_df, user_vector, career_vectors = preprocess_data(user_id)
    
    if user is None:
        return JsonResponse({"error": "User not found"}, status=404)

    # Call your function to compute similarity and get top matches
    _, matched_careers = compute_similarity(user_id)

    if matched_careers is None:
        return JsonResponse({"error": "No career matches found"}, status=404)

    # Convert career data to a JSON-friendly format
    results = matched_careers.to_dict(orient="records")
    
    return JsonResponse({
        "user": user.name,
        "top_career_matches": results
    })

def match_career(request, user_id):
    """API endpoint to return career matches for a user"""
    user, career_df, user_vector, career_vectors = preprocess_data(user_id)

    if user is None:
        return JsonResponse({"error": "User not found"}, status=404)

    # Ensure that matching logic is applied here.
    user, matched_careers = match_careers(user_id)  # Get the user and the career matches

    if matched_careers is None:
        return JsonResponse({"error": "No career matches found"}, status=404)

    # Convert results to JSON format
    results = matched_careers.to_dict(orient="records")

    return JsonResponse({
        "user": user.name,
        "top_career_matches": results
    })

def career_match_results(request, user_id):
    """API endpoint to return top career matches for a user"""
    user, matched_careers = compute_similarity(user_id)

    if user is None:
        return JsonResponse({"error": "User not found"}, status=404)

    # Convert results to JSON format
    results = matched_careers.to_dict(orient="records")  # Now, matched_careers should be a DataFrame

    return JsonResponse({
        "user": user.name,
        "top_career_matches": results
    })

def evaluate_match(request, user_id, actual_career):
    """API to evaluate career matching accuracy"""

    results = evaluate_matching(user_id, actual_career)

    if results is None:
        return JsonResponse({"error": "User not found"}, status=404)

    return JsonResponse(results)

def test_db_connection(request):
    """Check if database is connected and return sample data"""

    career_data = load_career_data().head(5).to_dict(orient="records")
    
    return JsonResponse({
        "status": "Connected",
        "sample_careers": career_data
    })

def test_user_data(request, user_id):
    """Check if user data is retrieved correctly"""

    user = load_user_data(user_id)

    if user is None:
        return JsonResponse({"error": "User not found"}, status=404)

    return JsonResponse({
        "user_id": user.user_id,
        "name": user.name,
        "education_level": user.education_level,
        "experience": user.experience,
        "career_preference": user.career_preference
    })
