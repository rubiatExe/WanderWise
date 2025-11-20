import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

class OptimizationScreen extends StatelessWidget {
  const OptimizationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>?;
    final origin = args?['origin'] ?? 'JFK';
    final dest = args?['destination'] ?? 'LHR';

    return Scaffold(
      appBar: AppBar(
        title: Text('$origin ✈️ $dest'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Optimization Results',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 24),
            
            // Best Option Card (Points)
            _buildOptionCard(
              context,
              title: 'Best Value: Transfer Points',
              subtitle: 'Transfer Chase UR to Aeroplan',
              cost: '60,000 pts + \$55',
              value: '2.8¢ per point',
              isRecommended: true,
              color: Theme.of(context).colorScheme.secondary,
            ),
            const SizedBox(height: 16),
            
            // Cash Option Card
            _buildOptionCard(
              context,
              title: 'Cash Price',
              subtitle: 'Book directly with United',
              cost: '\$1,750',
              value: 'Standard Fare',
              isRecommended: false,
              color: Colors.grey[800]!,
            ),
            
            const SizedBox(height: 32),
            Text(
              'Transfer Path',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
            const SizedBox(height: 16),
            
            // Simple Visualization of Transfer Path
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: const Color(0xFF1E1E1E),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildNode('Chase UR', Icons.credit_card),
                  const Icon(Icons.arrow_forward, color: Colors.white54),
                  _buildNode('Aeroplan', Icons.airplanemode_active),
                  const Icon(Icons.arrow_forward, color: Colors.white54),
                  _buildNode('United Ticket', Icons.confirmation_number),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOptionCard(
    BuildContext context, {
    required String title,
    required String subtitle,
    required String cost,
    required String value,
    required bool isRecommended,
    required Color color,
  }) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: isRecommended 
            ? BorderSide(color: color, width: 2) 
            : BorderSide.none,
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: GoogleFonts.outfit(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: isRecommended ? color : Colors.white,
                  ),
                ),
                if (isRecommended)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: color.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      'RECOMMENDED',
                      style: TextStyle(
                        color: color,
                        fontWeight: FontWeight.bold,
                        fontSize: 10,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 8),
            Text(subtitle, style: Theme.of(context).textTheme.bodyMedium),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  cost,
                  style: GoogleFonts.outfit(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
                Text(
                  value,
                  style: TextStyle(
                    color: isRecommended ? color : Colors.white54,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNode(String label, IconData icon) {
    return Column(
      children: [
        CircleAvatar(
          backgroundColor: const Color(0xFF2C2C2C),
          radius: 24,
          child: Icon(icon, color: Colors.white),
        ),
        const SizedBox(height: 8),
        Text(
          label,
          style: const TextStyle(fontSize: 12, color: Colors.white70),
        ),
      ],
    );
  }
}
