import 'dart:io';

import 'package:dio/dio.dart';
import '../exceptions/AuthException.dart';
import '../models/User.dart';

abstract class AuthService {
  Future<User> getCurrentUser();
  Future<bool> signIn(String email, String password);
  Future<bool> signUp(
      String email, String password, String name, String lastname);
  Future<void> signOut();
}

class APIAuthenticationService extends AuthService {
  @override
  Future<User> getCurrentUser() async {
    //mando refresh token a refresh endpoint
    return null; // Da fare
  }

  @override
  Future<bool> signIn(String email, String password) async {
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
  Future<bool> signUp(
      String email, String password, String name, String lastname) async {
    Response response;
    try {
      response = await Dio().post("http://127.0.0.1:3000/auth/register",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }),
          data: {
            "email": email,
            "password": password,
            "name": name,
            "lastname": lastname
          });
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response.statusCode == 400)
          throw new AuthException(message: "Insert invalid value");

        if (e.response.statusCode == 409)
          throw new AuthException(
              message: "email already exists", position: "email");
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
