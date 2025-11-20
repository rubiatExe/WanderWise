import os
import json
import sys
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# Import from current directory
from amadeus_client import AmadeusFlightClient

app = FastAPI()

# Initialize Amadeus client
amadeus_client = AmadeusFlightClient()

class ScrapeRequest(BaseModel):
    route_id: str
    date: str
    origin: str
    destination: str
    adults: int = 1
    travel_class: str = "ECONOMY"

@app.post("/scrape")
async def scrape_flights(request: ScrapeRequest):
    """
    Fetch real flight data from Amadeus API for American Airlines and others.
    """
    print(f"Fetching flights for {request.route_id} on {request.date}")
    
    try:
        # Search flights using Amadeus
        flights = amadeus_client.search_flights(
            origin=request.origin,
            destination=request.destination,
            departure_date=request.date,
            adults=request.adults,
            travel_class=request.travel_class
        )
        
        # Filter for American Airlines if specified
        aa_flights = [f for f in flights if f['is_american_airlines']]
        
        # Format response
        results = []
        for flight in flights:
            result = {
                "route_id": request.route_id,
                "source": "Amadeus_API",
                "data_type": "cash",
                "airline": flight['airline'],
                "flight_number": flight['flight_number'],
                "price_usd": flight['price'],
                "currency": flight['currency'],
                "departure_time": flight['departure_time'],
                "arrival_time": flight['arrival_time'],
                "duration": flight['duration'],
                "stops": flight['stops'],
                "aircraft": flight['aircraft'],
                "cabin_class": flight['cabin_class'],
                "is_american_airlines": flight['is_american_airlines'],
                "segments": flight['segments']
            }
            results.append(result)
        
        print(f"Found {len(results)} flights ({len(aa_flights)} American Airlines)")
        
        return {
            "status": "success",
            "total_flights": len(results),
            "american_airlines_flights": len(aa_flights),
            "flights": results
        }
        
    except Exception as e:
        print(f"Error fetching flights: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def health_check():
    return {
        "status": "ok",
        "service": "Cash Flight Scraper",
        "data_source": "Amadeus API"
    }

@app.get("/test")
async def test_search():
    """Test endpoint to quickly verify Amadeus integration"""
    try:
        flights = amadeus_client.search_flights(
            origin='JFK',
            destination='LAX',
            departure_date='2025-12-15'
        )
        return {
            "status": "success",
            "flights_found": len(flights),
            "sample": flights[0] if flights else None
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
