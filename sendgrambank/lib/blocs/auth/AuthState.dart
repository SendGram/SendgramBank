import '../../models/User.dart';

abstract class AuthState {
  const AuthState();
}

class AuthenticatedState extends AuthState {
  final User user;

  AuthenticatedState({this.user});
}

class AuthFail extends AuthState {
  final String message;

  AuthFail({this.message});
}

class AuthenticationInitial extends AuthState {}

class AuthenticationLoading extends AuthState {}

class AuthenticationNotAuthenticated extends AuthState {}
