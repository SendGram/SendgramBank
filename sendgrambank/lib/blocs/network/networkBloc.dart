import 'package:bloc/bloc.dart';
import 'networkState.dart';
import 'networkEvent.dart';

class NetworkBloc extends Bloc<NetworkEvent, NetworkState> {
  NetworkBloc(NetworkState initialState) : super(initialState);

  @override
  Stream<NetworkState> mapEventToState(NetworkEvent event) async* {
    if (event == NetworkEvent.NetworkFailEvent) {
      yield NetworkState.NetworkError;
    } else {
      yield NetworkState.NetworkAvailable;
    }
  }
}
