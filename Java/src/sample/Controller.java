package sample;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.Label;

public class Controller extends API {

    @FXML
    private Button Login;


    public void Do_Login(ActionEvent actionEvent) {
        request("ciao", "key", "value", "key", "value");
    }
}
