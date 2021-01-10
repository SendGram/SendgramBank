class AuthException implements Exception {
  final String message;
  final String position;

  AuthException({this.message = 'Unknown error occurred.', this.position});
}
