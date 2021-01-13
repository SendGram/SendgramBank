import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';
import '../exceptions/AuthException.dart';
import '../models/User.dart';

abstract class AuthService {
  Future<User> getCurrentUser();
  Future<User> signIn(String email, String password);
  Future<User> signUp(
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
  Future<User> signIn(String email, String password) async {
    Response response;
    User user;
    try {
      response = await Dio().post("http://127.0.0.1:3000/auth/login",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }),
          data: {"email": email, "password": password});
      user = User(
          email: email,
          JWT: response.data['jwt'],
          refreshToken: response.data['refreshToken']);
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response.statusCode == 400)
          throw new AuthException(
              message: "Insert a valid email and password",
              position: "emailPassword");

        if (e.response.statusCode == 401)
          throw new AuthException(
              message: "Wrong user name or password",
              position: "emailPassword");
      }

      throw new AuthException();
    }

    return user;
  }

  @override
  Future<User> signUp(
      String email, String password, String name, String lastname) async {
    Response response;
    User user;
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
      user = User(
          email: email,
          JWT: response.data['jwt'],
          refreshToken: response.data['refreshToken']);
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

    return user;
  }

  @override
  Future<void> signOut() {
    return null; // Da fare
  }
}
