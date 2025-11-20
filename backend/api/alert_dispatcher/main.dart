import 'dart:convert';
import 'dart:async';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

void main() async {
  final handler = const Pipeline()
      .addMiddleware(logRequests())
      .addHandler(_handleRequest);

  final server = await shelf_io.serve(handler, '0.0.0.0', 8080);
  print('Alert Dispatcher serving at http://${server.address.host}:${server.port}');
}

Future<Response> _handleRequest(Request request) async {
  if (request.method != 'POST') {
    return Response.ok('Alert Dispatcher Online');
  }

  try {
    final body = await request.readAsString();
    final data = jsonDecode(body);

    // CloudEvent structure from Pub/Sub push subscription
    final messageData = (data['message']['data'] as String?) ?? '';
    if (messageData.isEmpty) {
      return Response.ok('No data');
    }

    final decoded = utf8.decode(base64Decode(messageData));
    final alert = jsonDecode(decoded);

    print('Received Alert: $alert');

    // Extract Alert Details
    final routeId = alert['route_id'];
    final price = alert['new_price'];
    final type = alert['type'];

    // Dispatch Notification
    await _sendPushNotification(
      title: type == 'price_drop' ? 'Price Drop Alert!' : 'Award Seat Found!',
      body: 'Great news! $routeId is now available for \$$price.',
      topic: 'route_$routeId'
    );

    return Response.ok('Alert Processed');
  } catch (e) {
    print('Error processing alert: $e');
    return Response.internalServerError(body: 'Error processing alert');
  }
}

Future<void> _sendPushNotification({
  required String title, 
  required String body, 
  required String topic
}) async {
  // Simulate network call to Firebase Cloud Messaging
  await Future.delayed(Duration(milliseconds: 200));
  print('>>> PUSH SENT to $topic: "$title - $body"');
}
