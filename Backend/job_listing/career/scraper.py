import requests
from bs4 import BeautifulSoup
import logging
from datetime import datetime, timedelta
from django.utils import timezone
import re
from .models import Job

logger = logging.getLogger(__name__)

def parse_date(date_str):
    """Parse date strings like '2 days ago', 'Today', etc."""
    today = timezone.now().date()
    
    if not date_str or date_str.lower() == 'n/a':
        return None
    
    if 'today' in date_str.lower():
        return today
    
    if 'yesterday' in date_str.lower():
        return today - timedelta(days=1)
    
    # Match patterns like "2 days ago"
    days_match = re.search(r'(\d+)\s+days?\s+ago', date_str.lower())
    if days_match:
        days = int(days_match.group(1))
        return today - timedelta(days=days)
    
    # Match patterns like "2 weeks ago"
    weeks_match = re.search(r'(\d+)\s+weeks?\s+ago', date_str.lower())
    if weeks_match:
        weeks = int(weeks_match.group(1))
        return today - timedelta(weeks=weeks)
    
    # Try to parse as direct date format
    try:
        return datetime.strptime(date_str, '%d %b %Y').date()
    except ValueError:
        pass
    
    return None

def scrape_brighter_monday():
    """Scrape job listings from BrighterMonday Uganda"""
    base_url = "https://www.brightermonday.co.ug/jobs"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    jobs_count = 0
    
    try:
        # Scrape multiple pages
        for page in range(1, 6):  # Scrape first 5 pages
            url = f"{base_url}?page={page}"
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            job_listings = soup.select('div.search-result')
            
            for job in job_listings:
                try:
                    # Extract job details
                    title_elem = job.select_one('h3.search-result__job-title a')
                    if not title_elem:
                        continue
                        
                    title = title_elem.text.strip()
                    job_url = title_elem['href']
                    
                    # Get company name
                    company_elem = job.select_one('div.search-result__job-meta a')
                    company = company_elem.text.strip() if company_elem else "Unknown"
                    
                    # Get location
                    location_elem = job.select_one('div.search-result__location')
                    location = location_elem.text.strip() if location_elem else "Unknown"
                    
                    # Get job type
                    job_type_elem = job.select_one('a.search-result__job-type')
                    job_type = job_type_elem.text.strip() if job_type_elem else None
                    
                    # Get posted date
                    date_elem = job.select_one('div.search-result__date')
                    date_text = date_elem.text.strip() if date_elem else None
                    posted_date = parse_date(date_text) if date_text else None
                    
                    # Check if job already exists in database
                    if not Job.objects.filter(url=job_url).exists():
                        # Fetch detailed job page to get more information
                        job_response = requests.get(job_url, headers=headers)
                        job_soup = BeautifulSoup(job_response.text, 'html.parser')
                        
                        # Get job description
                        description_elem = job_soup.select_one('div.job-details__job-description')
                        description = description_elem.text.strip() if description_elem else None
                        
                        # Get salary if available
                        salary_elem = job_soup.select_one('div.salary-info')
                        salary = salary_elem.text.strip() if salary_elem else None
                        
                        # Create new job entry
                        Job.objects.create(
                            title=title,
                            company=company,
                            location=location,
                            job_type=job_type,
                            description=description,
                            salary=salary,
                            url=job_url,
                            posted_date=posted_date
                        )
                        jobs_count += 1
                    
                except Exception as e:
                    logger.error(f"Error processing job: {e}")
                    continue
            
    except Exception as e:
        logger.error(f"Error scraping BrighterMonday: {e}")
    
    return jobs_count

