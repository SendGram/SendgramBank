package tech.sendgram.DashboardForm;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.layout.AnchorPane;

import java.io.IOException;

public class DashboardController {

    @FXML
    private AnchorPane rootPane;

    @FXML
    private Button saldo, trans, inviaDenaro;

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
    }
}
