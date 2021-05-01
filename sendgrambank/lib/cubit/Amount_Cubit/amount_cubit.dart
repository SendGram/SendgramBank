import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'package:meta/meta.dart';
import 'package:sendgrambank/models/User.dart';

part 'amount_state.dart';

class AmountCubit extends Cubit<AmountState> {
  AmountCubit() : super(AmountInitial());

  Future<void> updateAmount(User user) async {
    Response response;

    response = await Dio().get("http://192.168.0.19:3000/users/amount",
        options: Options(headers: {
          HttpHeaders.contentTypeHeader: "application/json",
          "jwt": user.jwt
        }));

    emit(AmountValueState(amount: response.data['amount']));
  }
}
