import 'package:bloc/bloc.dart';
import 'package:dio/dio.dart';
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
    } else {
      yield TransactionInitialState();
    }
  }

  Stream<TransactionState> createNewTransaction(
      User sender, String beneficiary, String amount) async* {
    try {
      double doubleAmount = double.parse(amount);
      beneficiary = emailValidator(beneficiary);

      yield TransactionLoadingState();
      await _transactionService.newTransaction(
          sender, beneficiary, doubleAmount);

      yield TransactionCompletedState();
    } on FormatException catch (e) {
      yield TransactionErrorState(
          message: "Invalid amount", position: "amount");
    } catch (e) {
      if (e is DioError) {
        yield TransactionErrorState();
      } else {
        yield TransactionErrorState(message: e.message, position: e.position);
      }
    }
  }
}
