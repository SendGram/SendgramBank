import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/blocs/Transaction/index.dart';
import 'package:sendgrambank/widgets/CustomWidgets.dart';
import 'package:sendgrambank/models/User.dart';

class TransactionContent extends StatelessWidget {
  final _beneficiaryController = TextEditingController();
  final _amountController = TextEditingController();
  final User currentUser;
  TransactionContent({
    this.currentUser,
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    final transactionBloc = BlocProvider.of<TransactionBloc>(context);
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
                child: CustomTextField(
                  text: "Email del beneficiario",
                  controller: _beneficiaryController,
                )),
            Container(
                height: 70,
                width: size.width * 0.4,
                child: CustomTextField(
                    text: "Denaro da inviare", controller: _amountController)),
            Container(
              height: 60,
              width: size.width * 0.4,
              child: Row(
                children: [
                  Expanded(
                    child: CustomButton(
                        text: "Invia denaro",
                        onPressed: () {
                          String beneficiary =
                              _beneficiaryController.value.text;
                          String amount = _amountController.value.text;

                          transactionBloc.add(NewTransactionEvent(
                              sender: currentUser,
                              beneficiary: beneficiary,
                              amount: amount));
                        }),
                  ),
                  SizedBox(
                    width: 30,
                  ),
                  Expanded(
                    child:
                        CustomButton(text: "Torna indietro", onPressed: () {}),
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
