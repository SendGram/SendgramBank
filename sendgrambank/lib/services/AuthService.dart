import 'dart:io';

import 'package:dio/dio.dart';
import 'package:sendgrambank/blocs/login/login_state.dart';

import '../exceptions/AuthException.dart';
import '../models/User.dart';

final String ip = "127.0.0.1";

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
    var response;
    try {
      response = await Dio().post("http://127.0.0.1:3000/auth/login",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }),
          data: {"email": email, "password": password});
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response.statusCode == 400)
          throw new AuthException(message: "Insert a valid email and passowrd");

        if (e.response.statusCode == 401)
          throw new AuthException(message: "Wrong user name or password");
      }
    }

    return true;
  }

  @override
  Future<void> signOut() {
    return null; // Da fare
  }
}
