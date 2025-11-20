// Airline code to full name mapping
export const AIRLINE_NAMES: { [key: string]: string } = {
    'AA': 'American Airlines',
    'UA': 'United Airlines',
    'DL': 'Delta Air Lines',
    'B6': 'JetBlue Airways',
    'F9': 'Frontier Airlines',
    'NK': 'Spirit Airlines',
    'WN': 'Southwest Airlines',
    'AS': 'Alaska Airlines',
    'BA': 'British Airways',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'KL': 'KLM Royal Dutch Airlines',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'SQ': 'Singapore Airlines',
    'CX': 'Cathay Pacific',
    'NH': 'All Nippon Airways',
    'JL': 'Japan Airlines',
    'QF': 'Qantas',
    'AC': 'Air Canada',
    'IB': 'Iberia',
    'AY': 'Finnair',
    'LX': 'Swiss International Air Lines',
    'OS': 'Austrian Airlines',
    'TP': 'TAP Air Portugal',
    'SK': 'Scandinavian Airlines',
    'AZ': 'ITA Airways',
    'VS': 'Virgin Atlantic',
    'EI': 'Aer Lingus',
    'TK': 'Turkish Airlines',
    'SU': 'Aeroflot',
    'LO': 'LOT Polish Airlines',
};

export function getAirlineName(code: string): string {
    return AIRLINE_NAMES[code] || code;
}

export function getBookingLink(
    airline: string,
    origin: string,
    destination: string,
    date: string
): string {
    const formattedDate = date || new Date().toISOString().split('T')[0];

    // Airline-specific booking URLs - using Google Flights for most as it's more reliable
    // Only airlines with confirmed working deep links get direct URLs
    const airlineUrls: { [key: string]: string } = {
        // JetBlue has a working deep link
        'B6': `https://www.jetblue.com/booking/flights?from=${origin}&to=${destination}&depart=${formattedDate}&isMultiCity=false&noOfRoute=1&lang=en&adults=1`,

        // For most airlines, use Google Flights which works universally and shows all options
        'AA': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
        'UA': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
        'DL': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
        'F9': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
        'NK': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
        'WN': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
        'AS': `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`,
    };

    // If airline-specific URL exists, use it; otherwise use Google Flights
    return airlineUrls[airline] ||
        `https://www.google.com/travel/flights?q=Flights%20to%20${destination}%20from%20${origin}%20on%20${formattedDate}%20one%20way`;
}
