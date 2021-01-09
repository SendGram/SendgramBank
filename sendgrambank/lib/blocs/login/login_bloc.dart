import 'package:bloc/bloc.dart';
import 'package:sendgrambank/validator/LoginValidator.dart';
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
    String email = event.email;
    String password = event.password;
    yield LoginLoading();
    try {
      email = emailValidator(email);
      password = passwordValidator(password);

      final bool user = await _authenticationService.signInWithEmailAndPassword(
          email, password);
      if (user) {
        _authenticationBloc.add(UserLoggedIn());
        yield LoginSuccess();
        yield LoginInitial();
      } else {
        yield LoginFailure(error: 'Error');
      }
    } on AuthException catch (e) {
      yield LoginFailure(error: e.message, position: e.position);
    } catch (err) {
      yield LoginFailure(error: err.message ?? 'An unknown error occured');
    }
  }

  Stream<LoginState> _mapRegisterRequestToState(
      RegisterRequestEvent event) async* {
    String email = event.email;
    String password = event.password;
    String name = event.name;
    String lastName = event.lastName;

    yield LoginLoading();
    try {
      email = emailValidator(email);
      password = passwordValidator(password);
      name = nameValidator(name);
      lastName = lastNameValidator(lastName);

      //TODO use AuthService

      //fake event
      yield RegisterFailure(error: ".");
    } on AuthException catch (e) {
      print(e.message);
      yield RegisterFailure(error: e.message, position: e.position);
    } catch (err) {
      yield RegisterFailure(error: err.message ?? 'An unknown error occured');
    }
  }
}
