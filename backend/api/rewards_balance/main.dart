import 'dart:convert';
import 'dart:async';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

void main() async {
  final handler = const Pipeline()
      .addMiddleware(logRequests())
      .addHandler(_handleRequest);

  final server = await shelf_io.serve(handler, '0.0.0.0', 8080);
  print('Rewards Balance API serving at http://${server.address.host}:${server.port}');
}

Future<Response> _handleRequest(Request request) async {
  // Enable CORS
  if (request.method == 'OPTIONS') {
    return Response.ok('', headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
  }

  if (request.method != 'POST') {
    return Response.forbidden('Only POST requests are accepted');
  }

  try {
    final body = await request.readAsString();
    final params = jsonDecode(body);
    final userId = params['user_id'];

    if (userId == null) {
      return Response.badRequest(body: 'Missing user_id');
    }

    final balances = await _fetchBalances(userId);

    return Response.ok(
      jsonEncode(balances),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    );
  } catch (e) {
    print('Error: $e');
    return Response.internalServerError(body: 'Internal Error');
  }
}

Future<Map<String, dynamic>> _fetchBalances(String userId) async {
  // Simulate network delay
  await Future.delayed(Duration(milliseconds: 500));

  // Mock Data
  return {
    'user_id': userId,
    'last_updated': DateTime.now().toIso8601String(),
    'chase_ur_balance': 125000,
    'amex_mr_balance': 85000,
    'capital_one_miles': 42000,
    'status': 'success'
  };
}
