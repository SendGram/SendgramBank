import 'package:bloc/bloc.dart';
import 'index.dart';

class TransactionBloc extends Bloc<TransactionEvent, TransactionState> {
  TransactionBloc() : super(TransactionInitialState());

  @override
  Stream<TransactionState> mapEventToState(
    TransactionEvent event,
  ) async* {
    if (event is NewTransactionEvent) {
      print(event.beneficiary + " " + event.amount);
    }
  }
}
