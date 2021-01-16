import 'package:flutter/material.dart';
import 'package:sendgrambank/models/User.dart';

class HomePage extends StatelessWidget {
  final User currentUser;

  const HomePage({Key key, this.currentUser}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Container(child: Text(currentUser.lastname));
  }
}
