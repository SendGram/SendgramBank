import 'package:sendgrambank/exceptions/TransactionException.dart';
import 'package:validators2/sanitizers.dart';
import 'package:validators2/validators.dart';

String emailValidator(String email) {
  return (isEmail(email))
      ? trim(email)
      : throw new TransactionException(
          message: "Insert a valid email", position: "email");
}
