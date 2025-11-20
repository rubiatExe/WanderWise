import 'dart:convert';
import 'dart:async';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:http/http.dart' as http;

// Configuration - Scraper service URLs
const String cashScraperUrl = String.fromEnvironment(
  'CASH_SCRAPER_URL',
  defaultValue: 'https://cash-scraper-661417242642.us-central1.run.app'
);

void main() async {
  final handler = const Pipeline()
      .addMiddleware(logRequests())
      .addHandler(_handleRequest);

  final server = await shelf_io.serve(handler, '0.0.0.0', 8080);
  print('Search API serving at http://${server.address.host}:${server.port}');
  print('Cash Scraper URL: $cashScraperUrl');
}

Future<Response> _handleRequest(Request request) async {
  // Enable CORS
  if (request.method == 'OPTIONS') {
    return Response.ok('', headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
  }

  if (request.url.path == 'search') {
    return await _handleSearch(request);
  }

  return Response.ok('WanderWise Search API Online', headers: {
    'Access-Control-Allow-Origin': '*',
  });
}

Future<Response> _handleSearch(Request request) async {
  final params = request.url.queryParameters;
  final routeId = params['route'];
  final date = params['date'];

  if (routeId == null || date == null) {
    return Response.badRequest(
      body: jsonEncode({'error': 'Missing route or date'}),
      headers: {'Content-Type': 'application/json'},
    );
  }

  // Parse route into origin/destination
  final parts = routeId.split('-');
  if (parts.length != 2) {
    return Response.badRequest(
      body: jsonEncode({'error': 'Invalid route format. Use: ORIGIN-DESTINATION'}),
      headers: {'Content-Type': 'application/json'},
    );
  }

  final origin = parts[0];
  final destination = parts[1];

  try {
    // Call the cash scraper service to get real flight data
    final scrapeRequest = {
      'route_id': routeId,
      'date': date,
      'origin': origin,
      'destination': destination,
      'adults': 1,
      'travel_class': 'ECONOMY'
    };

    print('Calling cash scraper for: $origin -> $destination on $date');
    
    final scrapeResponse = await http.post(
      Uri.parse('$cashScraperUrl/scrape'),
      body: jsonEncode(scrapeRequest),
      headers: {'Content-Type': 'application/json'},
    ).timeout(Duration(seconds: 10));

    if (scrapeResponse.statusCode == 200) {
      final scrapeData = jsonDecode(scrapeResponse.body);
      final flights = scrapeData['flights'] as List;

      print('Received ${flights.length} flights from scraper');

      // Transform scraper response to our API format
      final results = flights.map((flight) {
        return {
          'source': flight['airline'],
          'price': flight['price_usd'],
          'type': 'cash',
          'link': 'https://www.aa.com',  // Would be real booking link
          'departure_time': flight['departure_time'],
          'arrival_time': flight['arrival_time'],
          'duration': flight['duration'],
          'stops': flight['stops'],
          'flight_number': flight['flight_number'],
          'aircraft': flight['aircraft'],
        };
      }).toList();

      final response = {
        'route_id': routeId,
        'date': date,
        'results': results,
        'prediction': {
          'recommendation': 'book',
          'confidence': 0.85,
          'expected_change': -45
        }
      };

      return Response.ok(
        jsonEncode(response),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      );
    } else {
      print('Scraper error: ${scrapeResponse.statusCode}');
      // Fall back to basic mock data
      return _mockResponse(routeId, date);
    }
  } catch (e) {
    print('Error calling scraper: $e');
    // Fall back to mock data on error
    return _mockResponse(routeId, date);
  }
}

Future<Response> _mockResponse(String routeId, String date) async {
  final response = {
    'route_id': routeId,
    'date': date,
    'results': [
      {
        'source': 'United',
        'price': 450,
        'type': 'cash',
        'link': 'https://united.com/...'
      },
      {
        'source': 'Aeroplan',
        'points': 60000,
        'taxes': 55.20,
        'type': 'award',
        'cabin': 'Business'
      }
    ],
    'prediction': {'recommendation': 'wait', 'confidence': 0.75}
  };

  return Response.ok(
    jsonEncode(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  );
}
