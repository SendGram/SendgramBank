import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String text;
  final String errorText;
  CustomTextField({this.text, this.controller, this.errorText});
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      cursorColor: Color(0xFF5C5C5C),
      style: TextStyle(
        color: Color(0xFF5C5C5C),
      ),
      decoration: InputDecoration(
          labelText: text,
          enabledBorder: UnderlineInputBorder(
              borderSide: BorderSide(color: Color(0xFF5C5C5C))),
          errorText: errorText,
          errorStyle: TextStyle(fontSize: 15)),
    );
  }
}
