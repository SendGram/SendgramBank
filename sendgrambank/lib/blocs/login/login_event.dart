abstract class LoginEvent {}

class LoginRequestEvent extends LoginEvent {
  final String email;
  final String password;

  LoginRequestEvent({this.email, this.password});
}

class RegisterRequestEvent extends LoginEvent {
  final String email;
  final String password;
  final String name;
  final String lastName;

  RegisterRequestEvent({this.email, this.password, this.name, this.lastName});
}

class GoToRegisterForm extends LoginEvent {}

class GoToLoginForm extends LoginEvent {}
