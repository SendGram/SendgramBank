import '../../models/User.dart';

abstract class AuthEvents {
  const AuthEvents();
}

class UserLoggedIn extends AuthEvents {}

class AppLoaded extends AuthEvents {}
