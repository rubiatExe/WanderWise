"""
Amadeus API Client for WanderWise
Fetches real flight data including cash prices and award availability
"""

import os
import ssl
from amadeus import Client, ResponseError

# Fix SSL certificate verification for macOS
# In production (Cloud Run), this won't be needed
ssl._create_default_https_context = ssl._create_unverified_context

class AmadeusFlightClient:
    def __init__(self):
        """Initialize Amadeus client with API credentials"""
        api_key = os.getenv('AMADEUS_API_KEY')
        api_secret = os.getenv('AMADEUS_API_SECRET')
        
        if not api_key or not api_secret or api_key == 'YOUR_API_KEY':
            print("Warning: Amadeus credentials not found or using defaults")
            print(f"API Key present: {bool(api_key and api_key != 'YOUR_API_KEY')}")
        
        self.client = Client(
            client_id=api_key or 'YOUR_API_KEY',
            client_secret=api_secret or 'YOUR_API_SECRET',
           log_level='debug'  # Enable debug logging
        )
        print(f"Amadeus client initialized")
    
    def search_flights(self, origin: str, destination: str, departure_date: str, 
                      adults: int = 1, travel_class: str = 'ECONOMY'):
        """
        Search for flight offers
        
        Args:
            origin: IATA airport code (e.g., 'JFK')
            destination: IATA airport code (e.g., 'LAX')
            departure_date: Date in YYYY-MM-DD format
            adults: Number of adult passengers
            travel_class: ECONOMY, PREMIUM_ECONOMY, BUSINESS, or FIRST
            
        Returns:
            List of flight offers with pricing
        """
        try:
            response = self.client.shopping.flight_offers_search.get(
                originLocationCode=origin,
                destinationLocationCode=destination,
                departureDate=departure_date,
                adults=adults,
                travelClass=travel_class,
                currencyCode='USD',
                max=10  # Limit results
            )
            
            return self._parse_flight_offers(response.data)
            
        except ResponseError as error:
            print(f"Amadeus API Error Details:")
            print(f"  Status Code: {error.response.status_code if hasattr(error, 'response') else 'N/A'}")
            print(f"  Description: {error.description if hasattr(error, 'description') else 'N/A'}")
            print(f"  Full error: {error}")
            return []
    
    def _parse_flight_offers(self, offers):
        """Parse Amadeus response into our format"""
        parsed_offers = []
        
        for offer in offers:
            try:
                # Extract flight segments
                itinerary = offer['itineraries'][0]
                segments = itinerary['segments']
                
                # Get pricing
                price = float(offer['price']['total'])
                currency = offer['price']['currency']
                
                # Get airline info
                airline_code = segments[0]['carrierCode']
                flight_number = segments[0]['number']
                
                # Calculate duration
                duration = itinerary['duration']  # ISO 8601 format
                
                # Determine if operated by American Airlines
                is_american = airline_code == 'AA'
                
                flight_data = {
                    'airline': airline_code,
                    'flight_number': f'{airline_code}{flight_number}',
                    'price': price,
                    'currency': currency,
                    'departure_time': segments[0]['departure']['at'],
                    'arrival_time': segments[-1]['arrival']['at'],
                    'duration': duration,
                    'stops': len(segments) - 1,
                    'aircraft': segments[0].get('aircraft', {}).get('code', 'Unknown'),
                    'cabin_class': segments[0].get('cabin', 'Economy'),
                    'is_american_airlines': is_american,
                    'segments': [
                        {
                            'departure': seg['departure'],
                            'arrival': seg['arrival'],
                            'carrier': seg['carrierCode'],
                            'flight_number': seg['number']
                        }
                        for seg in segments
                    ]
                }
                
                parsed_offers.append(flight_data)
                
            except (KeyError, IndexError) as e:
                print(f"Error parsing offer: {e}")
                continue
        
        return parsed_offers
    
    def get_airline_routes(self, airline_code: str = 'AA'):
        """Get available routes for an airline (useful for award availability)"""
        # This would require additional Amadeus APIs or endpoints
        # For now, focusing on flight offers
        pass

# Example usage
if __name__ == "__main__":
    client = AmadeusFlightClient()
    
    # Test search: JFK to LAX
    results = client.search_flights(
        origin='JFK',
        destination='LAX',
        departure_date='2025-12-15'
    )
    
    print(f"Found {len(results)} flights")
    for flight in results:
        print(f"{flight['airline']} - ${flight['price']} - {flight['stops']} stops")
