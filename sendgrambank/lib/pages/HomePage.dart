import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/blocs/Transaction/index.dart';
import 'package:sendgrambank/blocs/dashboardContent/DashboardContentBloc.dart';
import 'package:sendgrambank/blocs/dashboardContent/DashboardContentEvent.dart';
import 'package:sendgrambank/blocs/dashboardContent/DashboardContentState.dart';
import 'package:sendgrambank/cubit/Amount_Cubit/amount_cubit.dart';
import 'package:sendgrambank/models/User.dart';
import 'package:sendgrambank/pages/dashboardContent/TransactionContent.dart';
import 'package:sendgrambank/services/TransactionService.dart';
import 'package:sendgrambank/widgets/CustomButton.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'dashboardContent/GraphContent.dart';

class HomePage extends StatelessWidget {
  final User currentUser;

  const HomePage({Key key, this.currentUser}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final dashboardContentbloc = BlocProvider.of<DashboardContentBloc>(context);
    final amountCubit = BlocProvider.of<AmountCubit>(context)
      ..updateAmount(currentUser);

    Size size = MediaQuery.of(context).size;
    _initWebsocket(currentUser, amountCubit);
    return Scaffold(
      backgroundColor: Color(0xffD9D9D9),
      body: SafeArea(
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  height: 120,
                  width: 130,
                  decoration: BoxDecoration(color: Color(0xFF39A0ED)),
                  child: Text("sendgrambank logo"),
                ),
                Expanded(
                  child: Container(
                    height: 120,
                    decoration: BoxDecoration(color: Color(0xFFF9F8F8)),
                    child: Row(
                      children: [
                        Container(
                          margin: EdgeInsets.only(left: 35),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Container(
                                    height: 35,
                                    child:
                                        BlocBuilder<AmountCubit, AmountState>(
                                      builder: (context, state) {
                                        return Text(
                                            (state is AmountValueState)
                                                ? state.amount.toString() +
                                                    ".00"
                                                : "",
                                            style: GoogleFonts.roboto(
                                                textStyle: TextStyle(
                                                    fontSize: 35,
                                                    fontWeight: FontWeight.w500,
                                                    color: Color(0xff494949))));
                                      },
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsets.only(left: 10),
                                  ),
                                  Text("EUR",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w300)),
                                ],
                              ),
                              Text("Saldo")
                            ],
                          ),
                        ),
                        Expanded(
                          child: Align(
                            alignment: Alignment.centerRight,
                            child: Container(
                              width: 135,
                              height: 50,
                              child: CustomButton(
                                  text: "Logout", onPressed: () {}),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 50,
                        ),
                        Align(
                          alignment: Alignment.centerRight,
                          child: ClipOval(
                            child: Container(
                              child: Text(
                                "A",
                                style: TextStyle(color: Colors.black),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 10,
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Container(
                    width: 130,
                    decoration: BoxDecoration(color: Color(0xFFF9F8F8)),
                    child: Column(
                      children: [
                        SizedBox(height: 20),
                        Container(
                          width: 110,
                          child: CustomButton(
                              text: "Home",
                              onPressed: () {
                                dashboardContentbloc.add(
                                    DashboardContentEvent.GraphContentEvent);
                              }),
                        ),
                        SizedBox(height: 20),
                        Container(
                          width: 110,
                          child: CustomButton(
                              text: "Invia denaro",
                              onPressed: () {
                                dashboardContentbloc.add(
                                    DashboardContentEvent.TransactionEvent);
                              }),
                        )
                      ],
                    ),
                  ),

                  //internal space
                  BlocBuilder<DashboardContentBloc, DashboardContentState>(
                      builder: (context, state) {
                    if (state == DashboardContentState.GraphContentState)
                      return GraphContent();
                    else
                      return RepositoryProvider(
                        create: (context) => TransactionService(),
                        child: BlocProvider<TransactionBloc>(
                          create: (context) {
                            final transactionService =
                                RepositoryProvider.of<TransactionService>(
                                    context);
                            return TransactionBloc(transactionService);
                          },
                          child: TransactionContent(
                            currentUser: currentUser,
                          ),
                        ),
                      );
                  })
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  void _initWebsocket(User user, AmountCubit amountCubit) {
    IO.Socket socket = IO.io('http://localhost:8080', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': true,
      'query': {"token": currentUser.jwt}
    });
    socket.onConnect((_) {
      print('connect');
    });
    socket.onDisconnect((_) => print('disconnect'));
    socket.on("message", (data) => print(data));
    socket.on('newTransaction', (data) => amountCubit.updateAmount(user));
  }
}
