package tech.sendgram.Main;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.*;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;

import java.io.IOException;

public class Controller {

    @FXML
    AnchorPane rootPane;

    @FXML
    private TextField textEmail;

    @FXML
    private TextField textNome;

    @FXML
    private TextField textPasswd;

    @FXML
    private TextField textRepPasswd;

    @FXML
    private Button Accedi;

    @FXML
    private Button goReg;

    @FXML
    private Button goLogin;

    @FXML
    private Button registrati;


    public void Do_Login(ActionEvent actionEvent) {
        /*
        Login a = new Login(TextEmail.getText(), TextPassword.getText());

        a.accedi();

        if (a.accedi() == 1) {
            System.out.println("Carattere speciale rilevato");
            ErrorEmail.setVisible(true);
        } else if (a.accedi() == 2) {
            System.out.println("Troppo piccola o troppo grande");
            ErrorPasswd.setVisible(true);

        }
        */

    }


    public void go_Registarti(ActionEvent actionEvent) throws IOException {
        AnchorPane pane = FXMLLoader.load(getClass().getResource("Registrazione.fxml"));
        rootPane.getChildren().setAll(pane);
    }

    public void go_Login(ActionEvent actionEvent) throws IOException {
        AnchorPane pane = FXMLLoader.load(getClass().getResource("Login.fxml"));
        rootPane.getChildren().setAll(pane);
    }
}
