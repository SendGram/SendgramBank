import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/widgets/CustomTextField.dart';
import 'package:sendgrambank/widgets/CustomButton.dart';
import '../blocs/auth/auth.dart';
import '../blocs/login/login.dart';
import '../services/AuthService.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

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
              } else if (state is AuthFail) {
                return Text("Network Fail");
              }
              return BlocProvider(
                create: (context) => LoginBloc(authBloc, authService),
                child: LoginForm(),
              );
            }),
          ),
        ),
      ),
    );
  }
}

class LoginForm extends StatelessWidget {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _lastNameController = TextEditingController();
  LoginBloc loginBloc;

  @override
  Widget build(BuildContext context) {
    loginBloc = BlocProvider.of<LoginBloc>(context);
    return BlocConsumer<LoginBloc, LoginState>(listener: (context, state) {
      if (state is LoginFailure && state.position == null) {
        Scaffold.of(context).showSnackBar(SnackBar(content: Text(state.error)));
      }
    }, builder: (context, state) {
      if (state is LoginLoading) return LinearProgressIndicator();
      return Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text("Login",
              style:
                  GoogleFonts.oxygen(fontSize: 40, color: Color(0xffCECFC9))),
          SizedBox(
            height: 5,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: CustomTextField(
                  text: "Email",
                  controller: _emailController,
                  errorText: (state is LoginFailure &&
                          (state.position == "email" ||
                              state.position == "emailPassword"))
                      ? state.error
                      : null,
                ),
              )
            ],
          ),
          SizedBox(
            height: 5,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Expanded(
                child: CustomTextField(
                  text: "Password",
                  controller: _passwordController,
                  errorText: (state is LoginFailure &&
                          (state.position == "password" ||
                              state.position == "emailPassword"))
                      ? state.error
                      : null,
                ),
              ),
            ],
          ),
          if (state is Registering)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: CustomTextField(
                      text: "Name", controller: _nameController),
                ),
              ],
            ),
          if (state is Registering)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: CustomTextField(
                      text: "Lastname", controller: _lastNameController),
                ),
              ],
            ),
          SizedBox(
            height: 20,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Expanded(
                flex: 3,
                child: CustomButton(text: "HELP", onPressed: () {}),
              ),
              SizedBox(
                width: 10,
              ),
              Expanded(
                flex: 4,
                child: CustomButton(
                    text: "LOGIN",
                    onPressed: () {
                      if (state is Registering)
                        return loginBloc.add(GoToLoginForm());
                      String email = _emailController.value.text;
                      String password = _passwordController.value.text;

                      loginBloc.add(
                          LoginRequestEvent(email: email, password: password));
                    }),
              ),
              SizedBox(
                width: 10,
              ),
              Expanded(
                flex: 3,
                child: CustomButton(
                    text: "SIGNUP",
                    onPressed: () {
                      if (state is Registering) {
                        String email = _emailController.value.text;
                        String password = _passwordController.value.text;
                        String name = _nameController.value.text;
                        String lastName = _lastNameController.value.text;
                        loginBloc.add(RegisterRequestEvent(
                            email: email,
                            password: password,
                            name: name,
                            lastName: lastName));
                      } else {
                        loginBloc.add(GoToRegisterForm());
                      }
                    }),
              )
            ],
          ),
        ],
      );
    });
  }
}
