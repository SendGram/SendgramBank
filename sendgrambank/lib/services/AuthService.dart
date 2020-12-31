import '../exceptions/AuthException.dart';
import '../models/User.dart';

abstract class AuthService {
  Future<User> getCurrentUser();
  Future<User> signInWithEmailAndPassword(String email, String password);
  Future<void> signOut();
}

class APIAuthenticationService extends AuthService {
  @override
  Future<User> getCurrentUser() async {
    return null; // Da fare
  }

  @override
  Future<User> signInWithEmailAndPassword(String email, String password) async {
    //TODO chiamata API
    await Future.delayed(Duration(seconds: 1)); // finta azione bloccante

    if (email.toLowerCase() != 'mail@prova.com' || password != 'testpass123') {
      throw AuthException(message: 'Wrong email or password');
    }
    return User(name: 'Test User', email: email);
  }

  @override
  Future<void> signOut() {
    return null; // Da fare
  }
}
