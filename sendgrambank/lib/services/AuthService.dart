import 'dart:io';
import 'package:dio/dio.dart';
import 'package:sendgrambank/blocs/network/networkBloc.dart';
import 'package:sendgrambank/blocs/network/networkEvent.dart';
import '../exceptions/AuthException.dart';
import '../models/User.dart';
import 'LocalDbService.dart';

abstract class AuthService {
  Future<User> refreshToken(String refreshToken);
  Future<User> signIn(String email, String password);
  Future<User> signUp(
      String email, String password, String name, String lastname);
  Future<void> signOut();
}

class APIAuthenticationService extends AuthService {
  final LocalDbService _localDbService;
  final NetworkBloc _networkBloc;

  APIAuthenticationService(this._localDbService, this._networkBloc);
  @override
  Future<User> refreshToken(String refreshToken) async {
    if (refreshToken == null) return null;
    Response response;
    User user;
    try {
      response = await Dio().post("http://127.0.0.1:3000/auth/refresh",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }),
          data: {"refreshToken": refreshToken});
      user = User.fromJwt(response.data['jwt']);
      _localDbService.saveJwt(response.data['jwt']);
    } on DioError catch (e) {
      if (e.error is SocketException) {
        _networkBloc.add(NetworkEvent.NetworkFailEvent);
      }
      throw e;
    }

    return user;
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
      user = User.fromJwt(response.data['jwt']);
      _localDbService.saveTokens(
          response.data['jwt'], response.data['refreshToken']);
    } on DioError catch (e) {
      if (e.error is SocketException) {
        _networkBloc.add(NetworkEvent.NetworkFailEvent);
      } else if (e.response != null) {
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
      user = User.fromJwt(response.data['jwt']);
      _localDbService.saveTokens(
          response.data['jwt'], response.data['refreshToken']);
    } on DioError catch (e) {
      if (e.error is SocketException) {
        _networkBloc.add(NetworkEvent.NetworkFailEvent);
      } else if (e.response != null) {
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
