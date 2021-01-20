import 'package:jwt_decode/jwt_decode.dart';

class User {
  String email;
  String name;
  String lastname;

  User({this.email, this.name, this.lastname});

  User.fromJwt(String token) {
    final parsedToken = Jwt.parseJwt(token);
    this.email = parsedToken['email'];
    this.name = parsedToken['name'];
    this.lastname = parsedToken['lastname'];
  }
}
