import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final String text;
  CustomTextField({this.text, this.controller});
  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      cursorColor: Color(0xcfcfcf),
      style: TextStyle(
        color: Color(0xffffffff),
      ),
      decoration:
          InputDecoration(labelText: text, fillColor: Color(0xff9e9e9e)),
    );
  }
}
