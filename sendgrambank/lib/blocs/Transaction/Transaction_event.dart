abstract class TransactionEvent {}

class NewTransactionEvent extends TransactionEvent {
  String beneficiary;
  String amount;

  NewTransactionEvent({this.beneficiary, this.amount});
}
