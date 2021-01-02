abstract class LoginEvent {}

class LoginRequestEvent extends LoginEvent {
  final String email;
  final String password;

  LoginRequestEvent({this.email, this.password});
}
