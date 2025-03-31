import pandas as pd
from matching.models import Career, UserProfile

def load_career_data():
    """Load career data from MySQL into a Pandas DataFrame"""
    careers = Career.objects.all().values()
    return pd.DataFrame(careers)

def load_user_data(user_id):
    """Load a user's profile from MySQL"""
    try:
        user = UserProfile.objects.get(user_id=user_id)
        return user
    except UserProfile.DoesNotExist:
        return None
