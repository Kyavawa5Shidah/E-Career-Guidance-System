import pandas as pd
from matching.models import Career
from django.core.management.base import BaseCommand

# Load dataset
file_path = "C:/Users/SHIRAH/Desktop/career_matching/career_match/career_data.csv"
data = pd.read_csv(file_path, encoding="ISO-8859-1")


class Command(BaseCommand):
    help = "Load career dataset into the database"

    def handle(self, *args, **kwargs):
        for _, row in data.iterrows():
            Career.objects.create(
                career_name=row["Career_name"],
                description=row["Description"],
                required_skills=row["Required_skills"],
                qualifications=row["Qualifications"],
                industry_type=row["Industry_type"]
            )
        self.stdout.write(self.style.SUCCESS("Career dataset successfully loaded!"))
