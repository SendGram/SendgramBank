import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sendgrambank/pages/HomePage.dart';
import 'package:sendgrambank/pages/LoginPage.dart';
import 'package:sendgrambank/services/AuthService.dart';
import 'blocs/auth/auth.dart';

void main() =>
    //Dependency injection
    runApp(
      RepositoryProvider<AuthService>(
        create: (context) {
          return APIAuthenticationService();
        },
        child: BlocProvider<AuthenticationBloc>(
          create: (context) {
            final authService = RepositoryProvider.of<AuthService>(context);
            return AuthenticationBloc(authService)..add(AppLoaded());
          },
          child: MyApp(),
        ),
      ),
    );

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SendgramBank',
      theme: ThemeData(
          primaryColor: Color(0xffcfcfcf), hintColor: Color(0xff9e9e9e)),
      home: BlocBuilder<AuthenticationBloc, AuthState>(
        builder: (context, state) {
          if (state is AuthenticatedState) {
            //Utente già autenticato, mostro HomePage
            return HomePage();
          }
          return LoginPage();
        },
      ),
    );
  }
}