import 'package:bloc/bloc.dart';
import 'DashboardContentEvent.dart';
import 'DashboardContentState.dart';

class DashboardContentBloc
    extends Bloc<DashboardContentEvent, DashboardContentState> {
  DashboardContentBloc(DashboardContentState initialState)
      : super(initialState);

  @override
  Stream<DashboardContentState> mapEventToState(
      DashboardContentEvent event) async* {
    if (event == DashboardContentEvent.GraphContentEvent)
      yield DashboardContentState.GraphContentState;

    if (event == DashboardContentEvent.TransactionEvent)
      yield DashboardContentState.TransactionContentState;
  }
}
