import 'package:meta/meta.dart';

abstract class LoginState {}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {}

class LoginFailure extends LoginState {
  final String error;
  final String position;

  LoginFailure({@required this.error, this.position});
}

class RegisterFailure extends LoginFailure {
  RegisterFailure({@required error, position})
      : super(error: error, position: position);
}

class Registering extends LoginState {}
