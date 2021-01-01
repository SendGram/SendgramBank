import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

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
                      child: LoginTextField(text: "Email"),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Expanded(
                      child: LoginTextField(text: "Password"),
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
                      child: Button(text: "HELP", onPressed: () {}),
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Expanded(
                      flex: 4,
                      child: Button(text: "LOGIN", onPressed: () {}),
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Expanded(
                      flex: 3,
                      child: Button(text: "SIGNUP", onPressed: () {}),
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

class Button extends StatelessWidget {
  final String text;
  final Function onPressed;
  Button({this.text, this.onPressed});
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      //hover cfcfcf
      color: Color(0xff9e9e9e),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
      ),
      padding: EdgeInsets.all(20),
      child: Text(text,
          style: GoogleFonts.robotoCondensed(
              fontSize: 17, fontWeight: FontWeight.w500)),
      onPressed: onPressed,
    );
  }
}

class LoginTextField extends StatelessWidget {
  final String text;
  LoginTextField({this.text});
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      cursorColor: Color(0xcfcfcf),
      style: TextStyle(
        color: Color(0xffffffff),
      ),
      decoration:
          InputDecoration(labelText: text, fillColor: Color(0xff9e9e9e)),
    );
  }
}
