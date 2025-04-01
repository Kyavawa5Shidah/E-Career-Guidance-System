from django.core.management.base import BaseCommand
from career.scraper import scrape_brighter_monday
from rest_framework import DjangoFilterBackend


class Command(BaseCommand):
    help = 'Scrape jobs from BrighterMonday Uganda'

    def handle(self, *args, **options):
        self.stdout.write('Starting job scraping...')
        jobs_count = scrape_brighter_monday()
        self.stdout.write(self.style.SUCCESS(f'Successfully scraped {jobs_count} new jobs'))

