import 'dart:convert';
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
      response = await Dio().post("http://127.0.0.1:3000/transaction/new",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
            "jwt": sender.jwt
          }),
          data: {"beneficiary": beneficiary, "amount": amount});
    } on DioError catch (e) {
      if (e.response != null) {
        if (e.response.statusCode == 400)
          throw new TransactionException(
              message: "Inserisci email valida", position: "email");

        if (e.response.statusCode == 406) {
          String errorMessage = jsonDecode(e.response.toString())['message'];
          if (errorMessage == "Incorrect email") {
            throw new TransactionException(
                message: "Inserisci email valida", position: "email");
          }
          throw new TransactionException(
              message: "Saldo non sufficiente", position: "amount");
        }
      }
      throw e;
    }
  }
}
