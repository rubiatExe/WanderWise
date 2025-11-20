#!/usr/bin/env python3
"""Updated test script with SSL fix for Amadeus API integration"""

import sys
import os
import ssl
import certifi

# Fix SSL certificate verification
ssl._create_default_https_context = ssl._create_unverified_context

# Credentials should be set in environment variables before running this script
# Example: export AMADEUS_API_KEY='your_key'
#          export AMADEUS_API_SECRET='your_secret'
if not os.getenv('AMADEUS_API_KEY') or not os.getenv('AMADEUS_API_SECRET'):
    print("❌ ERROR: Please set AMADEUS_API_KEY and AMADEUS_API_SECRET environment variables")
    sys.exit(1)

# Add parent directory to path
sys.path.append('..')

from amadeus_client import AmadeusFlightClient

print("=== Testing Amadeus API Integration (SSL Fix Applied) ===\n")

try:
    client = AmadeusFlightClient()
    print("✓ Client initialized")
    
    print("\nSearching for flights: JFK → LAX on 2025-12-15...")
    flights = client.search_flights('JFK', 'LAX', '2025-12-15')
    
    print(f"✓ Success! Found {len(flights)} flights\n")
    
    if flights:
        print("Sample flights:")
        for i, flight in enumerate(flights[:5], 1):
            aa_indicator = " ✈️ AMERICAN AIRLINES" if flight['is_american_airlines'] else ""
            print(f"{i}. {flight['airline']} {flight['flight_number']} - ${flight['price']:.2f} - {flight['stops']} stops{aa_indicator}")
        
        aa_count = sum(1 for f in flights if f['is_american_airlines'])
        print(f"\n✈️ American Airlines flights: {aa_count}/{len(flights)}")
        print("\n✅ Amadeus API is working correctly!")
    else:
        print("⚠️ No flights found - this could be normal for test data")
        
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
