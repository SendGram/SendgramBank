package tech.sendgram.Main;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import tech.sendgram.API.API;
import tech.sendgram.API.Login;

public class Controller {

    @FXML
    private Button Login;


    public void Do_Login(ActionEvent actionEvent) {
        Login a = new Login("ale", "bose");
        a.accedi();

    }
}
