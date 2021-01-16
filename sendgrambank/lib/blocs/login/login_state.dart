abstract class LoginState {}

class LoginInitial extends LoginState {}

class LoginLoading extends LoginState {}

class LoginSuccess extends LoginState {}

class LoginFailure extends LoginState {
  final String error;
  final String position;

  LoginFailure({this.error, this.position});
}

class RegisterFailure extends LoginFailure {
  RegisterFailure({error, position}) : super(error: error, position: position);
}

class Registering extends LoginState {}
