import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/widgets/CustomWidgets.dart';

class TransactionContent extends StatelessWidget {
  const TransactionContent({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Expanded(
      child: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text("Invia denaro",
                style:
                    GoogleFonts.roboto(fontSize: 30, color: Color(0xff494949))),
            Container(
                height: 60,
                width: size.width * 0.4,
                child: CustomTextField(text: "Email destinatario")),
            Container(
                height: 70,
                width: size.width * 0.4,
                child: CustomTextField(text: "Denaro da inviare")),
            Container(
              height: 60,
              width: size.width * 0.4,
              child: Row(
                children: [
                  Expanded(
                    child: CustomButton(
                      text: "Invia denaro",
                    ),
                  ),
                  SizedBox(
                    width: 30,
                  ),
                  Expanded(
                    child: CustomButton(
                      text: "Torna indietro",
                    ),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
