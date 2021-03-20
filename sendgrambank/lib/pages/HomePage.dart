import 'package:fl_chart/fl_chart.dart';
import 'package:flare_flutter/flare_actor.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sendgrambank/models/User.dart';

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
  FirstGraph({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(10),
      child: LineChart(mainData()),
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
    return Container(
      margin: EdgeInsets.all(10),
      child: LineChart(mainData()),
    );
  }
}

List<Color> gradientColors = [
  const Color(0xff23b6e6),
  const Color(0xff02d39a),
];

LineChartData mainData() {
  return LineChartData(
    lineTouchData: LineTouchData(enabled: false),
    gridData: FlGridData(
      show: false,
      drawVerticalLine: true,
    ),
    titlesData: FlTitlesData(
      show: true,
      bottomTitles: SideTitles(
        showTitles: true,
        reservedSize: 22,
        getTextStyles: (value) => const TextStyle(
            color: Color(0xff68737d),
            fontWeight: FontWeight.bold,
            fontSize: 16),
        getTitles: (value) {
          //fake data, only for testing purposes
          switch (value.toInt()) {
            case 2:
              return 'MAR';
            case 5:
              return 'JUN';
            case 8:
              return 'SEP';
          }
          return '';
        },
        margin: 8,
      ),
      leftTitles: SideTitles(
        showTitles: true,
        getTextStyles: (value) => const TextStyle(
          color: Color(0xff67727d),
          fontWeight: FontWeight.bold,
          fontSize: 15,
        ),
        getTitles: (value) {
          //fake data, only for testing purposes
          switch (value.toInt()) {
            case 1:
              return '10k';
            case 3:
              return '30k';
            case 5:
              return '50k';
          }
          return '';
        },
        reservedSize: 28,
        margin: 12,
      ),
    ),
    borderData: FlBorderData(
      show: false,
    ),
    minX: 0,
    maxX: 11,
    minY: 0,
    maxY: 6,
    lineBarsData: [
      LineChartBarData(
        spots: [
          //fake data, only for testing purposes
          FlSpot(0, 3),
          FlSpot(2.6, 2),
          FlSpot(4.9, 5),
          FlSpot(6.8, 3.1),
          FlSpot(8, 4),
          FlSpot(9.5, 3),
          FlSpot(11, 4),
        ],
        isCurved: true,
        colors: gradientColors,
        barWidth: 0,
        isStrokeCapRound: true,
        dotData: FlDotData(
          show: false,
        ),
        belowBarData: BarAreaData(
          show: true,
          colors:
              gradientColors.map((color) => color.withOpacity(0.3)).toList(),
        ),
      ),
    ],
  );
}
