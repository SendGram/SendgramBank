import 'package:sendgrambank/models/User.dart';
import 'package:sendgrambank/services/LocalDbService.dart';
import 'AuthEvents.dart';
import 'AuthState.dart';
import '../../services/AuthService.dart';
import 'package:bloc/bloc.dart';

class AuthenticationBloc extends Bloc<AuthEvents, AuthState> {
  final AuthService _authenticationService;
  final LocalDbService _localDbService;

  AuthenticationBloc(
      AuthService authenticationService, LocalDbService localDbService)
      : _authenticationService = authenticationService,
        _localDbService = localDbService,
        super(AuthenticationInitial());

  @override
  Stream<AuthState> mapEventToState(AuthEvents event) async* {
    if (event is AppLoaded) {
      yield* _mapAppLoadedToState(event);
    }
    if (event is UserLoggedIn) {
      yield AuthenticatedState(user: event.user);
    }
  }

  Stream<AuthState> _mapAppLoadedToState(AppLoaded event) async* {
    //mappa evento -> stato per app appena aperta (AppLoaded)
    yield AuthenticationLoading();
    try {
      final User user = await _authenticationService
          .refreshToken(await _localDbService.getRefreshToken());

      if (user != null) {
        yield AuthenticatedState(user: user);
      } else {
        //Utente deve fare il login
        yield AuthenticationNotAuthenticated();
      }
    } catch (e) {
      print(e);
      yield AuthenticationNotAuthenticated();
    }
  }
}
