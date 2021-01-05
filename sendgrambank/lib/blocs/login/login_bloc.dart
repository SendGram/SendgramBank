import 'package:bloc/bloc.dart';
import 'login_event.dart';
import 'login_state.dart';
import '../auth/AuthenticationBloc.dart';
import '../auth/AuthEvents.dart';
import '../../exceptions/AuthException.dart';
import '../../services/AuthService.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {
  final AuthenticationBloc _authenticationBloc;
  final AuthService _authenticationService;

  LoginBloc(
      AuthenticationBloc authenticationBloc, AuthService authenticationService)
      : _authenticationBloc = authenticationBloc,
        _authenticationService = authenticationService,
        super(LoginInitial());

  @override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    if (event is LoginRequestEvent) {
      yield* _mapLoginWithEmailToState(event);
    } else if (event is GoToRegisterForm) {
      yield Registering();
    } else if (event is RegisterRequestEvent) {
      yield* _mapRegisterRequestToState(event);
    } else if (event is GoToLoginForm) {
      yield LoginInitial();
    }
  }

  Stream<LoginState> _mapLoginWithEmailToState(LoginRequestEvent event) async* {
    yield LoginLoading();
    try {
      final bool user = await _authenticationService.signInWithEmailAndPassword(
          event.email, event.password);
      if (user) {
        _authenticationBloc.add(UserLoggedIn());
        yield LoginSuccess();
        yield LoginInitial();
      } else {
        yield LoginFailure(error: 'Error');
      }
    } on AuthException catch (e) {
      yield LoginFailure(error: e.message);
    } catch (err) {
      yield LoginFailure(error: err.message ?? 'An unknown error occured');
    }
  }

  Stream<LoginState> _mapRegisterRequestToState(LoginEvent event) async* {
    //TODO use AuthService
    yield LoginLoading();
    await Future.delayed(Duration(seconds: 2));
    yield LoginFailure(error: "error");
  }
}
