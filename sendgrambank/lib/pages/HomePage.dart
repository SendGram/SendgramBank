import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/models/User.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

class HomePage extends StatelessWidget {
  final User currentUser;

  const HomePage({Key key, this.currentUser}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    print(size.width);
    return Scaffold(
      backgroundColor: Color(0xffD9D9D9),
      body: SafeArea(
        child: Column(
          children: [
            Row(
              children: [
                Container(
                  height: 120,
                  width: 130,
                  decoration: BoxDecoration(color: Color(0xFF39A0ED)),
                  child: Text("sendgrambank logo"),
                ),
                Expanded(
                  child: Container(
                    height: 120,
                    decoration: BoxDecoration(color: Color(0xFFF9F8F8)),
                    child: Row(
                      children: [
                        Container(
                          margin: EdgeInsets.only(left: 35),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.end,
                                children: [
                                  Container(
                                    height: 35,
                                    child: Text("500.00",
                                        style: GoogleFonts.roboto(
                                            textStyle: TextStyle(
                                                fontSize: 35,
                                                fontWeight: FontWeight.w500,
                                                color: Color(0xff494949)))),
                                  ),
                                  Padding(
                                    padding: EdgeInsets.only(left: 10),
                                  ),
                                  Text("EUR",
                                      style: TextStyle(
                                          fontWeight: FontWeight.w300)),
                                ],
                              ),
                              Text("Saldo")
                            ],
                          ),
                        ),
                        Expanded(
                          child: Align(
                            alignment: Alignment.centerRight,
                            child: Container(
                              width: 128,
                              height: 40,
                              child: ElevatedButton(
                                autofocus: false,
                                onPressed: () {},
                                child: Text(
                                  "Logout",
                                  style: TextStyle(
                                    fontSize: 20,
                                  ),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 50,
                        ),
                        Align(
                          alignment: Alignment.centerRight,
                          child: ClipOval(
                            child: Container(
                              child: Text(
                                "A",
                                style: TextStyle(color: Colors.black),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 10,
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 130,
                    decoration: BoxDecoration(color: Color(0xFFF9F8F8)),
                  ),

                  //internal space
                  Content()
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}

class Content extends StatelessWidget {
  const Content({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Expanded(
      child: Padding(
        padding: const EdgeInsets.all(30.0),
        child: SingleChildScrollView(
          child: Wrap(
            spacing: 20,
            runSpacing: 20,
            children: [
              Container(
                height: 200,
                width: (size.width > 1000)
                    ? (size.width - 130 - 40) / 2 - 20
                    : (size.width - 130 - 40),
                child: FirstGraph(),
                decoration: BoxDecoration(
                  color: Color(0xffF7F8F8),
                ),
              ),
              Container(
                height: 200,
                width: (size.width > 1000)
                    ? (size.width - 130 - 40) / 2 - 20
                    : (size.width - 130 - 40),
                child: Text("2"),
                decoration: BoxDecoration(
                  color: Color(0xffF7F8F8),
                ),
              ),
              Container(
                width: (size.width - 130 - 40),
                child: LargeGraph(),
                decoration: BoxDecoration(
                  color: Color(0xffF7F8F8),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

//da rinominare una volta scelti i dati
class FirstGraph extends StatelessWidget {
  const FirstGraph({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      // Initialize category axis
      primaryXAxis: CategoryAxis(),
      series: <LineSeries<TransactionDataExample, String>>[
        LineSeries<TransactionDataExample, String>(
            // Bind data source
            dataSource: <TransactionDataExample>[
              TransactionDataExample('Gen', 35),
              TransactionDataExample('Feb', 28),
              TransactionDataExample('Mar', 34),
              TransactionDataExample('Apr', 32),
              TransactionDataExample('Mag', 40)
            ],
            xValueMapper: (TransactionDataExample t, _) => t.year,
            yValueMapper: (TransactionDataExample t, _) => t.transactions),
      ],
    );
  }
}

//da rinominare una volta scelti i dati
class LargeGraph extends StatelessWidget {
  const LargeGraph({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      tooltipBehavior: TooltipBehavior(enable: true),
      title: ChartTitle(text: "Tot entrare e uscite (spline chart)"),
      primaryYAxis: NumericAxis(minimum: 20),
      primaryXAxis: CategoryAxis(),
      series: <SplineSeries<TransactionDataExample, String>>[
        SplineSeries<TransactionDataExample, String>(
          // Bind data source
          dataSource: <TransactionDataExample>[
            TransactionDataExample('Gen', 35),
            TransactionDataExample('Feb', 28),
            TransactionDataExample('Mar', 34),
            TransactionDataExample('Apr', 32),
            TransactionDataExample('Mag', 40)
          ],
          xValueMapper: (TransactionDataExample t, _) => t.year,
          yValueMapper: (TransactionDataExample t, _) => t.transactions,
          markerSettings: MarkerSettings(isVisible: true),
        )
      ],
    );
  }
}

class TransactionDataExample {
  TransactionDataExample(this.year, this.transactions);
  final String year;
  final int transactions;
}
