import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:meta/meta.dart';
import 'package:sendgrambank/models/User.dart';

class AmountCubit extends Cubit<double> {
  AmountCubit() : super(0.0);

  Future<void> updateAmount(User user) async {
    Response response;

    response = await Dio().get("http://localhost:3000/users/amount",
        options: Options(headers: {
          HttpHeaders.contentTypeHeader: "application/json",
          "jwt": user.jwt
        }));

    emit(response.data['amount'].toDouble());
  }
}
