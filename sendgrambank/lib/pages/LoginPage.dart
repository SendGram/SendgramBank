import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/widgets/CustomTextField.dart';
import 'package:sendgrambank/widgets/CustomButton.dart';

class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xff37474f),
      body: SafeArea(
        child: Center(
          child: Container(
            width: (size.width < 750) ? size.width * 0.8 : size.width * 0.4,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text("Login",
                    style: GoogleFonts.oxygen(
                        fontSize: 40, color: Color(0xffCECFC9))),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: CustomTextField(text: "Email"),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: CustomTextField(text: "Password"),
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
                      child: CustomButton(text: "LOGIN", onPressed: () {}),
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Expanded(
                      flex: 3,
                      child: CustomButton(text: "SIGNUP", onPressed: () {}),
                    )
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
