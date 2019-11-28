package tech.sendgram.DashboardForm;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Insets;
import javafx.scene.control.*;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import tech.sendgram.Main.Conto;


import java.io.Console;
import java.io.IOException;


public class DashboardController {
    @FXML
    private AnchorPane rootPane;

    @FXML
    private Button saldo, trans, inviaDenaro;

    @FXML
    private ScrollPane scrool;

    @FXML
    private VBox transBox;

    @FXML
    private Label nome, labelSaldo;

    @FXML
    private TextField desti, insertM;

    String[][] t = {{"2019-11-25", "500", "Ale", "Bose"}, {"2019-11-26", "800", "Ale", "caldo"}};



    @FXML
    public void initialize() {
        nome.setText("ale");
        Conto.labelSaldo = labelSaldo;
        Conto.refreshSaldo();
        for (String[] a : Conto.getTransazioni()) {
            newItem(a[0], a[1], a[2], a[3]);

        }
    }


    public void newItem(String d, String i, String m, String de) {
        HBox a = new HBox();
        Label data = new Label(d);
        Label importo = new Label(i);
        Label mittenre = new Label(m);
        Label destinatario = new Label(de);
        a.prefWidth(200);
        a.prefHeight(40);

        data.setStyle("-fx-font-size: 15px");
        importo.setStyle("-fx-font-size: 15px");
        mittenre.setStyle("-fx-font-size: 15px");
        destinatario.setStyle("-fx-font-size: 15px");

        a.setMargin(data, new Insets(10, 0, 0, 50));
        a.setMargin(importo, new Insets(10, 0, 0, 100));
        a.setMargin(mittenre, new Insets(10, 0, 0, 100));
        a.setMargin(destinatario, new Insets(10, 0, 0, 100));

        transBox.getChildren().add(a);
        scrool.setContent(transBox);
        a.getChildren().add(data);
        a.getChildren().add(importo);
        a.getChildren().add(mittenre);
        a.getChildren().add(destinatario);



    }


    public void switchElement(ActionEvent actionEvent) throws IOException {
        if (actionEvent.getSource().equals(saldo)) {
            AnchorPane pane = FXMLLoader.load(getClass().getResource("DashboardSaldo.fxml"));
            rootPane.getChildren().setAll(pane);
        } else if (actionEvent.getSource().equals(trans)) {
            AnchorPane pane = FXMLLoader.load(getClass().getResource("DashboardTrans.fxml"));
            rootPane.getChildren().setAll(pane);

        } else if (actionEvent.getSource().equals(inviaDenaro)) {
            AnchorPane pane = FXMLLoader.load(getClass().getResource("DashboardInviaDenaro.fxml"));
            rootPane.getChildren().setAll(pane);
        }
    }

    public void sendMoney(ActionEvent actionEvent) {
        //float a = Float.parseFloat(insertM.getText());
        Conto.newTrans(100f, "bose");
    }

}
