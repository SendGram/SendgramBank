part of 'amount_cubit.dart';

abstract class AmountState {}

class AmountInitial extends AmountState {}

class AmountValueState extends AmountState {
  int amount;
  AmountValueState({this.amount});
}
