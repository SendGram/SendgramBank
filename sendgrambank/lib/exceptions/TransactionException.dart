class TransactionException implements Exception {
  final String message;
  final String position;

  TransactionException(
      {this.message = 'Unknown error occurred.', this.position});
}
