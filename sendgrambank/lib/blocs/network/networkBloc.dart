import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
import 'networkState.dart';
import 'networkEvent.dart';

class NetworkBloc extends Bloc<NetworkEvent, NetworkState> {
  NetworkBloc(NetworkState initialState) : super(initialState);

  @override
  Stream<NetworkState> mapEventToState(NetworkEvent event) async* {
    if (event == NetworkEvent.NetworkFailEvent) {
      yield NetworkState.NetworkError;
    } else {
      yield* _retry();
    }
  }

  Stream<NetworkState> _retry() async* {
    Response response;
    try {
      response = await Dio().get("http://127.0.0.1:3000/",
          options: Options(headers: {
            HttpHeaders.contentTypeHeader: "application/json",
          }));
      yield NetworkState.NetworkAvailable;
    } on DioError catch (e) {
      yield NetworkState.NetworkError;
    }
  }
}
