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
      await Future.delayed(Duration(
          milliseconds:
              500)); // finta richiesta bloccante per testare AuthenticationLoading()
      final currentUser = await _authenticationService.getCurrentUser();

      if (currentUser != null) {
        yield AuthenticatedState(user: currentUser);
      } else {
        yield AuthenticationNotAuthenticated();
      }
    } catch (e) {
      yield throw AuthException();
    }
  }

  Stream<AuthState> _mapUserLoggedInToState(UserLoggedIn event) async* {
    yield AuthenticatedState(user: event.user);
  }
}
