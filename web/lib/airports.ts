// Common airport codes for autocomplete
export const AIRPORTS = [
    // United States - Major Hubs
    { code: 'JFK', name: 'New York JFK', city: 'New York', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles', city: 'Los Angeles', country: 'USA' },
    { code: 'ORD', name: 'Chicago O\'Hare', city: 'Chicago', country: 'USA' },
    { code: 'DFW', name: 'Dallas/Fort Worth', city: 'Dallas', country: 'USA' },
    { code: 'ATL', name: 'Atlanta', city: 'Atlanta', country: 'USA' },
    { code: 'SFO', name: 'San Francisco', city: 'San Francisco', country: 'USA' },
    { code: 'MIA', name: 'Miami', city: 'Miami', country: 'USA' },
    { code: 'BOS', name: 'Boston', city: 'Boston', country: 'USA' },
    { code: 'SEA', name: 'Seattle', city: 'Seattle', country: 'USA' },
    { code: 'LAS', name: 'Las Vegas', city: 'Las Vegas', country: 'USA' },
    { code: 'EWR', name: 'Newark', city: 'Newark', country: 'USA' },
    { code: 'IAH', name: 'Houston', city: 'Houston', country: 'USA' },
    { code: 'PHX', name: 'Phoenix', city: 'Phoenix', country: 'USA' },
    { code: 'DEN', name: 'Denver', city: 'Denver', country: 'USA' },

    // International - Major Cities
    { code: 'LHR', name: 'London Heathrow', city: 'London', country: 'UK' },
    { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France' },
    { code: 'FRA', name: 'Frankfurt', city: 'Frankfurt', country: 'Germany' },
    { code: 'AMS', name: 'Amsterdam', city: 'Amsterdam', country: 'Netherlands' },
    { code: 'DXB', name: 'Dubai', city: 'Dubai', country: 'UAE' },
    { code: 'NRT', name: 'Tokyo Narita', city: 'Tokyo', country: 'Japan' },
    { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japan' },
    { code: 'ICN', name: 'Seoul Incheon', city: 'Seoul', country: 'South Korea' },
    { code: 'SIN', name: 'Singapore', city: 'Singapore', country: 'Singapore' },
    { code: 'HKG', name: 'Hong Kong', city: 'Hong Kong', country: 'Hong Kong' },
    { code: 'SYD', name: 'Sydney', city: 'Sydney', country: 'Australia' },
    { code: 'MEL', name: 'Melbourne', city: 'Melbourne', country: 'Australia' },
    { code: 'YYZ', name: 'Toronto', city: 'Toronto', country: 'Canada' },
    { code: 'YVR', name: 'Vancouver', city: 'Vancouver', country: 'Canada' },
];

export function searchAirports(query: string) {
    if (!query || query.length < 2) return [];

    const normalizedQuery = query.toLowerCase().trim();

    return AIRPORTS.filter(airport =>
        airport.code.toLowerCase().includes(normalizedQuery) ||
        airport.name.toLowerCase().includes(normalizedQuery) ||
        airport.city.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10); // Limit to 10 results
}
