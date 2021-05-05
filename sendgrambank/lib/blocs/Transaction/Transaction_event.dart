import 'package:sendgrambank/models/User.dart';

abstract class TransactionEvent {}

class NewTransactionEvent extends TransactionEvent {
  User sender;
  String beneficiary;
  String amount;

  NewTransactionEvent({this.sender, this.beneficiary, this.amount});
}
