import '../../models/User.dart';

abstract class AuthState {
  const AuthState();
}

class AuthenticatedState extends AuthState {
  final User user;

  AuthenticatedState({this.user});
}

class AuthenticationInitial extends AuthState {}

class AuthenticationLoading extends AuthState {}

class AuthenticationNotAuthenticated extends AuthState {}
