import 'package:bloc/bloc.dart';
import 'package:sendgrambank/models/User.dart';
import 'package:sendgrambank/services/TransactionService.dart';
import 'index.dart';

class TransactionBloc extends Bloc<TransactionEvent, TransactionState> {
  final TransactionService _transactionService;

  TransactionBloc(TransactionService transactionService)
      : _transactionService = transactionService,
        super(TransactionInitialState());

  @override
  Stream<TransactionState> mapEventToState(
    TransactionEvent event,
  ) async* {
    if (event is NewTransactionEvent) {
      createNewTransaction(event.sender, event.beneficiary, event.amount);
    }
  }

  void createNewTransaction(User sender, String beneficiary, String amount) {
    try {
      double doubleAmount = double.parse(amount);
      _transactionService.newTransaction(sender, beneficiary, doubleAmount);
    } on FormatException catch (e) {
      print(e);
    }
  }
}
