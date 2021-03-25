import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:sendgrambank/blocs/dashboardContent/DashboardContentState.dart';
import 'package:sendgrambank/pages/HomePage.dart';
import 'package:sendgrambank/pages/LoginPage.dart';
import 'package:sendgrambank/pages/NetworkErrorScreen.dart';
import 'package:sendgrambank/services/AuthService.dart';
import 'package:sendgrambank/services/LocalDbService.dart';
import 'blocs/auth/auth.dart';
import 'blocs/dashboardContent/DashboardContentBloc.dart';
import 'blocs/network/networkBloc.dart';
import 'blocs/network/networkState.dart';

void main() {
  LocalDbService _localDbService = new LocalDbService();
  NetworkBloc _networkBloc = new NetworkBloc(NetworkState.NetworkAvailable);
  //Dependency injection
  runApp(
    MultiRepositoryProvider(
      providers: [
        RepositoryProvider<AuthService>(
          create: (context) {
            return APIAuthenticationService(_localDbService, _networkBloc);
          },
        ),
        RepositoryProvider<LocalDbService>(
          create: (context) {
            return _localDbService;
          },
        )
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthenticationBloc>(
            create: (context) {
              final authService = RepositoryProvider.of<AuthService>(context);
              final localDbService =
                  RepositoryProvider.of<LocalDbService>(context);
              return AuthenticationBloc(authService, localDbService)
                ..add(AppLoaded());
            },
          ),
          BlocProvider<NetworkBloc>(create: (context) {
            return _networkBloc;
          })
        ],
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
      home: BlocBuilder<NetworkBloc, NetworkState>(
        builder: (context, state) {
          if (state == NetworkState.NetworkError) {
            return NetworkErrorScreen();
          }
          return BlocBuilder<AuthenticationBloc, AuthState>(
            builder: (context, state) {
              if (state is AuthenticatedState) {
                return BlocProvider<DashboardContentBloc>(
                    create: (context) => DashboardContentBloc(
                        DashboardContentState.GraphContentState),
                    child: HomePage(currentUser: state.user));
              }
              return LoginPage();
            },
          );
        },
      ),
    );
  }
}
