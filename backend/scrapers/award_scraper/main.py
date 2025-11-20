import os
import json
import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from playwright.async_api import async_playwright
from google.cloud import pubsub_v1

app = FastAPI()

# Configuration
PROJECT_ID = os.getenv("PROJECT_ID", "wanderwise-dev")
TOPIC_ID = os.getenv("TOPIC_ID", "flight-data-stream")

# Pub/Sub Publisher
try:
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(PROJECT_ID, TOPIC_ID)
except Exception as e:
    print(f"Warning: Could not initialize Pub/Sub (running locally?): {e}")
    publisher = None
    topic_path = None

class AwardScrapeRequest(BaseModel):
    route_id: str
    date: str
    program: str # e.g., "aeroplan", "flyingblue"

@app.post("/scrape_award")
async def scrape_awards(request: AwardScrapeRequest):
    """
    Trigger an award availability scrape for a specific loyalty program.
    """
    print(f"Starting award scrape for {request.program} on {request.route_id}")
    
    results = []
    
    async with async_playwright() as p:
        # Launch browser with stealth args (mocked here)
        # In production, use playwright-stealth or similar plugins
        browser = await p.chromium.launch(
            headless=True, 
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"]
        )
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        try:
            # Mocking the interaction with a loyalty program site
            # await page.goto(f"https://www.{request.program}.com")
            # await page.type("#username", "secret_user") ...
            
            # Mock Data
            award_data = {
                "route_id": request.route_id,
                "timestamp": "2023-10-27T10:05:00Z",
                "source": f"Award_Scraper_{request.program}",
                "data_type": "award",
                "program": request.program,
                "points_required": 75000,
                "taxes_usd": 55.20,
                "cabin_class": "Business",
                "is_award": True,
                "available": True
            }
            results.append(award_data)
            
            # Publish to Pub/Sub
            data_str = json.dumps(award_data)
            
            if publisher and topic_path:
                future = publisher.publish(topic_path, data_str.encode("utf-8"))
                print(f"Published award message ID: {future.result()}")
            else:
                print(f"[LOCAL MODE] Would publish award: {data_str}")
            
        except Exception as e:
            print(f"Award scraping failed: {e}")
            raise HTTPException(status_code=500, detail=str(e))
        finally:
            await browser.close()

    return {"status": "success", "scraped_count": len(results)}
