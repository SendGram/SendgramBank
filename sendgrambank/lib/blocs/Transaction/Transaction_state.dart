abstract class TransactionState {}

class TransactionInitialState extends TransactionState {}

class TransactionErrorState extends TransactionState {
  String message;
  String position;
  TransactionErrorState({this.message, this.position});
}

class TransactionCompletedState extends TransactionState {}

class TransactionLoadingState extends TransactionState {}
