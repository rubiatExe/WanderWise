import 'dart:convert';
import 'dart:async';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

void main() async {
  final handler = const Pipeline()
      .addMiddleware(logRequests())
      .addHandler(_echoRequest);

  final server = await shelf_io.serve(handler, '0.0.0.0', 8080);
  print('Serving at http://${server.address.host}:${server.port}');
}

Future<Response> _echoRequest(Request request) async {
  if (request.url.path == 'optimize') {
    final params = request.url.queryParameters;
    final source = params['source_bank'];
    final target = params['target_program'];
    final points = int.tryParse(params['points_needed'] ?? '0') ?? 0;

    if (source == null || target == null) {
      return Response.badRequest(body: 'Missing source_bank or target_program');
    }

    // Mocking the SQL Graph Query Result
    // In production, this would use 'postgres' package to execute the recursive query
    final path = [
      {'step': 1, 'from': source, 'to': target, 'ratio': 1.0, 'time': 'Instant'}
    ];
    
    final totalPoints = points; // Assuming 1:1 for mock

    return Response.ok(
      jsonEncode({
        'path': path,
        'total_points_needed': totalPoints,
        'valuation_cpp': 2.8, // Mocked CPP
        'status': 'optimal'
      }),
      headers: {'Content-Type': 'application/json'},
    );
  }

  return Response.ok('Transfer Path Service Online');
}
