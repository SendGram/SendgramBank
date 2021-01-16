import '../../models/User.dart';

abstract class AuthEvents {
  const AuthEvents();
}

class UserLoggedIn extends AuthEvents {
  final User user;

  UserLoggedIn({this.user});
}

class AppLoaded extends AuthEvents {}
