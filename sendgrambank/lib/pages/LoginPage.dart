import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/widgets/CustomTextField.dart';
import 'package:sendgrambank/widgets/CustomButton.dart';
import '../blocs/auth/auth.dart';
import '../blocs/login/login.dart';
import '../services/AuthService.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

import 'loginForms/LoginForm.dart';
import 'loginForms/RegisterForm.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final authService = RepositoryProvider.of<AuthService>(context);
    final authBloc = BlocProvider.of<AuthenticationBloc>(context);
    final size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xff37474f),
      body: SafeArea(
        child: Center(
          child: Container(
            width: (size.width < 750) ? size.width * 0.8 : size.width * 0.4,
            child: BlocBuilder<AuthenticationBloc, AuthState>(
                builder: (context, state) {
              if (state is AuthenticationLoading) {
                return LinearProgressIndicator();
              }
              return BlocProvider(
                create: (context) => LoginBloc(authBloc, authService),
                child: _Form(),
              );
            }),
          ),
        ),
      ),
    );
  }
}

class _Form extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocConsumer<LoginBloc, LoginState>(listener: (context, state) {
      if (state is LoginFailure && state.position == null) {
        Scaffold.of(context).showSnackBar(SnackBar(content: Text(state.error)));
      }
    }, builder: (context, state) {
      if (state is LoginLoading) return LinearProgressIndicator();
      if (state is Registering || state is RegisterFailure)
        return RegisterForm(state: state);
      return LoginForm(
        state: state,
      );
    });
  }
}
