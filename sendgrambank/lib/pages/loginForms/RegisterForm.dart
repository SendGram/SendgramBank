import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/blocs/login/login_bloc.dart';
import 'package:sendgrambank/blocs/login/login_event.dart';
import 'package:sendgrambank/blocs/login/login_state.dart';
import 'package:sendgrambank/widgets/CustomButton.dart';
import 'package:sendgrambank/widgets/CustomTextField.dart';

class RegisterForm extends StatelessWidget {
  static final _emailController = TextEditingController();
  static final _passwordController = TextEditingController();
  static final _nameController = TextEditingController();
  static final _lastNameController = TextEditingController();
  final state;
  LoginBloc loginBloc;

  RegisterForm({Key key, this.state}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    loginBloc = BlocProvider.of<LoginBloc>(context);

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Text("Signup",
            style: GoogleFonts.oxygen(fontSize: 40, color: Color(0xffCECFC9))),
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
                errorText:
                    (state is RegisterFailure && state.position == "email")
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
                errorText:
                    (state is RegisterFailure && state.position == "password")
                        ? state.error
                        : null,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: CustomTextField(
                text: "Name",
                controller: _nameController,
                errorText:
                    (state is RegisterFailure && state.position == "name")
                        ? state.error
                        : null,
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Expanded(
              child: CustomTextField(
                text: "Lastname",
                controller: _lastNameController,
                errorText:
                    (state is RegisterFailure && state.position == "lastName")
                        ? state.error
                        : null,
              ),
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
                    loginBloc.add(GoToLoginForm());
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
                    String email = _emailController.value.text;
                    String password = _passwordController.value.text;
                    String name = _nameController.value.text;
                    String lastName = _lastNameController.value.text;
                    loginBloc.add(RegisterRequestEvent(
                        email: email,
                        password: password,
                        name: name,
                        lastName: lastName));
                  }),
            )
          ],
        ),
      ],
    );
  }
}
