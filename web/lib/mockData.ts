const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://search-subscription-wbo7y3qacq-uc.a.run.app';

export interface FlightResult {
    id: number;
    airline: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    points: number;
    prediction: "book" | "wait";
    predictionConfidence?: number;
    expectedPriceChange?: number;
    stops?: number;
    aircraft?: string;
    flight_number?: string;
    cabin_class?: string;
    segments?: Array<{
        departure: {
            iataCode: string;
            at: string;
        };
        arrival: {
            iataCode: string;
            at: string;
        };
        carrier: string;
        flight_number: string;
    }>;
}

export interface SearchResponse {
    route_id: string;
    date: string;
    results: Array<{
        source: string;
        price?: number;
        points?: number;
        taxes?: number;
        type: 'cash' | 'award';
        link?: string;
        cabin?: string;
        departure_time?: string;
        arrival_time?: string;
        duration?: string;
        stops?: number;
        aircraft?: string;
        flight_number?: string;
        cabin_class?: string;
        segments?: Array<{
            departure: {
                iataCode: string;
                at: string;
            };
            arrival: {
                iataCode: string;
                at: string;
            };
            carrier: string;
            flight_number: string;
        }>;
    }>;
    prediction?: any;
}

export async function searchFlights(
    origin: string,
    destination: string,
    date: Date | null
): Promise<FlightResult[]> {
    // If no search params, return empty
    if (!origin || !destination) {
        return generateMockResults(origin, destination, date);
    }

    try {
        const routeId = `${origin}-${destination}`;
        const dateStr = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

        const response = await fetch(
            `${API_BASE_URL}/search?route=${routeId}&date=${dateStr}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.warn('API call failed, falling back to mock data');
            return generateMockResults(origin, destination, date);
        }

        const data: SearchResponse = await response.json();


        const prediction = data.prediction || {};
        const recommendation = prediction.recommendation === 'book' ? 'book' : 'wait';
        const confidence = prediction.confidence || 0;
        const expectedChange = prediction.expected_change || 0;

        // Transform backend response to frontend format
        return data.results.map((result, index) => ({
            id: index,
            airline: result.source,
            departureTime: result.departure_time || generateRandomTime(),
            arrivalTime: result.arrival_time || generateRandomTime(8),
            duration: result.duration || `${6 + Math.floor(Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
            price: result.price || 0,
            points: result.points || (result.price ? Math.floor(result.price * 65) : 0),
            prediction: recommendation,
            predictionConfidence: confidence,
            expectedPriceChange: expectedChange,
            stops: result.stops !== undefined ? result.stops : 0,
            aircraft: result.aircraft,
            flight_number: result.flight_number,
            cabin_class: result.cabin_class,
            segments: result.segments,
        }));
    } catch (error) {
        console.error('Error fetching from API:', error);
        // Fallback to mock data
        return generateMockResults(origin, destination, date);
    }
}

// Helper function to generate random time
function generateRandomTime(offset: number = 0): string {
    const hour = (Math.floor(Math.random() * 24) + offset) % 24;
    const min = Math.floor(Math.random() * 60);
    return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
}

// Fallback mock data generator
function generateMockResults(
    origin: string,
    destination: string,
    date: Date | null
): FlightResult[] {
    const AIRLINES = [
        "British Airways",
        "Virgin Atlantic",
        "Delta",
        "American Airlines",
        "United",
        "Emirates",
        "Lufthansa",
        "Air France",
    ];

    const count = Math.floor(Math.random() * 5) + 3;
    const results: FlightResult[] = [];

    for (let i = 0; i < count; i++) {
        const airline = AIRLINES[Math.floor(Math.random() * AIRLINES.length)];
        const price = Math.floor(Math.random() * 500) + 300;
        const points = Math.floor(price * 65);

        results.push({
            id: i,
            airline,
            departureTime: generateRandomTime(),
            arrivalTime: generateRandomTime(8),
            duration: `${6 + Math.floor(Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
            price,
            points,
            prediction: Math.random() > 0.5 ? "book" : "wait",
        });
    }

    return results;
}
