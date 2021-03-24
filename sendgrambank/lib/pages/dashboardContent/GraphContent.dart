import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/cupertino.dart';

class GraphContent extends StatelessWidget {
  const GraphContent({
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
