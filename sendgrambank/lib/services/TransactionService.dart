import 'dart:io';

import 'package:dio/dio.dart';
import 'package:sendgrambank/exceptions/TransactionException.dart';
import 'package:sendgrambank/models/User.dart';

class TransactionService {
  Future<void> newTransaction(
    User sender,
    String beneficiary,
    double amount,
  ) async {
    Response response;
    try {
      response = await Dio().post("http://192.168.0.19:3000/transaction/new",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
            "jwt": sender.jwt
          }),
          data: {"beneficiary": beneficiary, "amount": amount});
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response.statusCode == 400)
          throw new TransactionException(
              message: "Insert a valid email", position: "email");

        if (e.response.statusCode == 406) {
          throw new TransactionException(
              message: "insufficient balace", position: "amount");
        }
      }
    }
  }
}
