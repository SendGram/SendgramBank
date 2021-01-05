import 'dart:io';

import 'package:dio/dio.dart';
import 'package:sendgrambank/blocs/login/login_state.dart';

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
    var response;
    try {
      response = await Dio().post("http://192.168.1.116:3000/auth/login",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }),
          data: {"email": email, "password": password});
    } on DioError catch (e) {
      throw AuthException();
    }
    if (response.statusCode == 400)
      throw new AuthException(message: "Invalid email or password");
    else if (response.statusCode == 401)
      throw new AuthException(message: "Wrong user name or password");
    else
      return response.statusCode == 200;
  }

  @override
  Future<void> signOut() {
    return null; // Da fare
  }
}
