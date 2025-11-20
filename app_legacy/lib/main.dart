import 'package:flutter/material.dart';
import 'theme.dart';
import 'screens/search_screen.dart';
import 'screens/optimization_screen.dart';

void main() {
  runApp(const WanderWiseApp());
}

class WanderWiseApp extends StatelessWidget {
  const WanderWiseApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WanderWise',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const SearchScreen(),
        '/optimize': (context) => const OptimizationScreen(),
      },
    );
  }
}
