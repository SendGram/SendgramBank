import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CustomButton extends StatelessWidget {
  final String text;
  final Function onPressed;
  CustomButton({this.text, this.onPressed});
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
