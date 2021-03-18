import 'package:flutter/material.dart';
import 'package:sendgrambank/models/User.dart';

class HomePage extends StatelessWidget {
  final User currentUser;

  const HomePage({Key key, this.currentUser}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
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
                        Align(
                          alignment: AlignmentDirectional.center,
                          child: Text("coso"),
                        ),
                        Expanded(
                          child: Align(
                            alignment: Alignment.centerRight,
                            child: Container(
                              width: 128,
                              height: 30,
                              child: ElevatedButton(
                                autofocus: false,
                                onPressed: () {},
                                child: Text(
                                  "Logout",
                                  style: TextStyle(
                                    fontSize: 20,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
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
              child: Align(
                alignment: Alignment.centerLeft,
                child: Container(
                  width: 130,
                  decoration: BoxDecoration(color: Color(0xFFF9F8F8)),
                ),
              ),
            )
          ],
        )));
  }
}
