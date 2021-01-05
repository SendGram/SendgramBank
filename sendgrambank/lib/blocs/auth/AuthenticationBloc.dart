import 'AuthEvents.dart';
import 'AuthState.dart';
import '../../services/AuthService.dart';
import 'package:bloc/bloc.dart';
import '../../exceptions/AuthException.dart';

class AuthenticationBloc extends Bloc<AuthEvents, AuthState> {
  final AuthService _authenticationService;

  AuthenticationBloc(AuthService authenticationService)
      : _authenticationService = authenticationService,
        super(AuthenticationInitial());

  @override
  Stream<AuthState> mapEventToState(AuthEvents event) async* {
    if (event is AppLoaded) {
      yield* _mapAppLoadedToState(event);
    }

    if (event is UserLoggedIn) {
      yield* _mapUserLoggedInToState(event);
    }
  }

  Stream<AuthState> _mapAppLoadedToState(AppLoaded event) async* {
    //mappa evento -> stato per app appena aperta (AppLoaded)
    yield AuthenticationLoading();
    try {
      //otteniamo Refresh Token da Hive (DB) verifichiamo se è valido
      await Future.delayed(Duration(
          milliseconds:
              500)); // finta richiesta bloccante per testare AuthenticationLoading()
      final currentUser = await _authenticationService.getCurrentUser();

      if (currentUser != null) {
        //Refresh token è valido, utento loggato
        yield AuthenticatedState();
      } else {
        //Utente deve fare il login
        yield AuthenticationNotAuthenticated();
      }
    } catch (e) {
      yield throw AuthException();
    }
  }

  Stream<AuthState> _mapUserLoggedInToState(UserLoggedIn event) async* {
    yield AuthenticatedState();
  }
}
