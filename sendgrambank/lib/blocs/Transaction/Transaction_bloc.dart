import 'package:bloc/bloc.dart';
import 'package:sendgrambank/exceptions/TransactionException.dart';
import 'package:sendgrambank/models/User.dart';
import 'package:sendgrambank/services/TransactionService.dart';
import 'index.dart';
import 'package:sendgrambank/validator/TransactionValidator.dart';

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
      yield* createNewTransaction(
          event.sender, event.beneficiary, event.amount);
    }
  }

  Stream<TransactionState> createNewTransaction(
      User sender, String beneficiary, String amount) async* {
    try {
      double doubleAmount = double.parse(amount);
      beneficiary = emailValidator(beneficiary);

      await _transactionService.newTransaction(
          sender, beneficiary, doubleAmount);
    } on FormatException catch (e) {
      yield TransactionErrorState(
          message: "Invalid amount", position: "amount");
    } catch (e) {
      print("error");
      yield TransactionErrorState(message: e.message, position: e.position);
    }
  }
}
