import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sendgrambank/pages/HomePage.dart';
import 'package:sendgrambank/pages/LoginPage.dart';
import 'package:sendgrambank/services/AuthService.dart';
import 'package:sendgrambank/services/LocalDbService.dart';
import 'blocs/auth/auth.dart';

void main() {
  LocalDbService localDbService = new LocalDbService();
  //Dependency injection
  runApp(
    MultiRepositoryProvider(
      providers: [
        RepositoryProvider<AuthService>(
          create: (context) {
            return APIAuthenticationService(localDbService);
          },
        ),
        RepositoryProvider<LocalDbService>(
          create: (context) {
            return localDbService;
          },
        )
      ],
      child: BlocProvider<AuthenticationBloc>(
        create: (context) {
          final authService = RepositoryProvider.of<AuthService>(context);
          final localDbService = RepositoryProvider.of<LocalDbService>(context);
          return AuthenticationBloc(authService, localDbService)
            ..add(AppLoaded());
        },
        child: MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'SendgramBank',
      theme: ThemeData(
          primaryColor: Color(0xff39A0ED), hintColor: Color(0xff5C5C5C)),
      home: BlocBuilder<AuthenticationBloc, AuthState>(
        builder: (context, state) {
          if (state is AuthenticatedState) {
            return HomePage(currentUser: state.user);
          }
          return LoginPage();
        },
      ),
    );
  }
}
