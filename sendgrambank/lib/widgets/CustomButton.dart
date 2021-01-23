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
      color: Color(0xff39A0ED),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8.0),
      ),
      padding: EdgeInsets.all(20),
      child: Text(text,
          style: GoogleFonts.robotoCondensed(
              fontSize: 17,
              fontWeight: FontWeight.w500,
              color: Color(0xFFD9D9D9))),
      onPressed: onPressed,
    );
  }
}
