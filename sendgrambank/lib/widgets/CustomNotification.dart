import 'package:bot_toast/bot_toast.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void createNotification(String title, String text) {
  BotToast.showCustomNotification(
    enableSlideOff: true,
    duration: Duration(seconds: 5),
    toastBuilder: (CancelFunc cancelFunc) {
      return Align(
        alignment: Alignment.bottomRight,
        child: Container(
            height: 80,
            margin: EdgeInsets.only(bottom: 20, right: 20),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(0),
              color: Color(0xff5a5a5a),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title,
                    style: GoogleFonts.roboto(
                        textStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.white))),
                Padding(padding: EdgeInsets.only(top: 5)),
                Text(text,
                    style: GoogleFonts.roboto(
                        textStyle:
                            TextStyle(fontSize: 16, color: Colors.white)))
              ],
            )),
      );
    },
  );
}
