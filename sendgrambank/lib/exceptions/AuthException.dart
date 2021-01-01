class AuthException implements Exception {
  final String message;

  AuthException({this.message = 'Unknown error occurred.'});
}
