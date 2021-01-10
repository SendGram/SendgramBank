import 'package:sendgrambank/exceptions/AuthException.dart';
import 'package:validators/sanitizers.dart';
import 'package:validators/validators.dart';

String emailValidator(String email) {
  return (isEmail(email))
      ? trim(email)
      : throw new AuthException(
          message: "Insert a valid email", position: "email");
}

String passwordValidator(String password) {
  return (password.length > 10 && password.length < 40)
      ? password
      : throw new AuthException(
          message: "The password must be at least 10 characters long",
          position: "password");
}

String nameValidator(String name) {
  return (RegExp(r"[a-zA-Z][a-zA-Z ]{2,15}").hasMatch(name))
      ? name
      : throw new AuthException(
          message: "The name must be between 3 and 15 characters long.",
          position: "name");
}

String lastNameValidator(String lastName) {
  return (RegExp(r"[a-zA-Z][a-zA-Z ]{2,15}").hasMatch(lastName))
      ? lastName
      : throw new AuthException(
          message: "The lastName must be between 3 and 15 characters long.",
          position: "lastName");
}
