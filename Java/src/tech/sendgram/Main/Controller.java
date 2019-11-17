package tech.sendgram.Main;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.PasswordField;
import javafx.scene.input.InputMethodEvent;
import javafx.scene.control.TextField;
import tech.sendgram.API.API;
import tech.sendgram.API.Login;

public class Controller {

    @FXML
    private Button Login;

    @FXML
    private TextField TextEmail;

    @FXML
    private PasswordField TextPassword;

    @FXML
    private Label ErrorEmail;

    @FXML
    private Label ErrorPasswd;
    @FXML
    private TextField TextEmail;

    @FXML
    private PasswordField TextPassword;

    public void Do_Login(ActionEvent actionEvent) {

        Login a = new Login(TextEmail.getText(), TextPassword.getText());

        Login a = new Login(TextEmail.getText(), TextPassword.getText());
        a.accedi();

        if (a.accedi() == 1) {
            System.out.println("Carattere speciale rilevato");
            ErrorEmail.setVisible(true);
        } else if (a.accedi() == 2) {
            System.out.println("Troppo piccola o troppo grande");
            ErrorPasswd.setVisible(true);

        }


    }

    public void Check_Char(InputMethodEvent event) {
        System.out.println("Cambio");
    }
}
