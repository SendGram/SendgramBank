import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/blocs/network/networkBloc.dart';
import 'package:sendgrambank/blocs/network/networkEvent.dart';
import 'package:sendgrambank/widgets/CustomButton.dart';
import 'package:smart_flare/actors/smart_flare_actor.dart';

class NetworkErrorScreen extends StatelessWidget {
  const NetworkErrorScreen({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Color(0xFFFFFFFF),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Container(
              child: SmartFlareActor(
                  width: size.width * 0.4,
                  height: size.width * 0.4,
                  startingAnimation: 'init',
                  filename: 'lib/animation/net.flr'),
            ),
            Padding(
              padding: EdgeInsets.only(top: 40),
              child: Text(
                "Controlla la tua connessione",
                style: GoogleFonts.roboto(
                  textStyle: TextStyle(
                    fontSize: 30,
                    color: Color(0xff7a8592),
                  ),
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 30),
              width: 150,
              child: CustomButton(
                text: "RIPROVA",
                onPressed: () {
                  final _networkBloc = BlocProvider.of<NetworkBloc>(context);
                  _networkBloc.add(NetworkEvent.CheckConnectivity);
                },
              ),
            )
          ],
        ),
      ),
    );
  }
}
