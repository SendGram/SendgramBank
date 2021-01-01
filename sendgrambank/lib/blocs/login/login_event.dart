abstract class LoginEvent {}

class LoginInWithEmailButtonPressed extends LoginEvent {
  final String email;
  final String password;

  LoginInWithEmailButtonPressed({this.email, this.password});
}
