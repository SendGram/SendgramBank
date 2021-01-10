import 'dart:io';

import 'package:dio/dio.dart';
import '../exceptions/AuthException.dart';
import '../models/User.dart';

abstract class AuthService {
  Future<User> getCurrentUser();
  Future<bool> signInWithEmailAndPassword(String email, String password);
  Future<void> signOut();
}

class APIAuthenticationService extends AuthService {
  @override
  Future<User> getCurrentUser() async {
    //mando refresh token a refresh endpoint
    return null; // Da fare
  }

  @override
  Future<bool> signInWithEmailAndPassword(String email, String password) async {
    Response response;
    try {
      response = await Dio().post("http://127.0.0.1:3000/auth/login",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }),
          data: {"email": email, "password": password});
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response.statusCode == 400)
          throw new AuthException(
              message: "Insert a valid email and passowrd",
              position: "emailPassword");

        if (e.response.statusCode == 401)
          throw new AuthException(
              message: "Wrong user name or password",
              position: "emailPassword");
      }

      throw new AuthException();
    }

    return response.statusCode == 200;
  }

  @override
  Future<void> signOut() {
    return null; // Da fare
  }
}
