package tech.sendgram.Main;

import javafx.animation.TranslateTransition;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.util.Duration;
import tech.sendgram.API.Login;
import tech.sendgram.API.Registrazione;

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
    private Label ErrorPasswd;

    @FXML
    private Label ErrorEmail;

    @FXML
    private Button registrati;

    @FXML
    private Button Accedi;

    @FXML
    private Button goReg;

    @FXML
    private Button goLogin;




    public void Do_Login(ActionEvent actionEvent) {

        Login a = new Login(textEmail.getText(), textPasswd.getText());
        textEmail.setStyle(" -fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        textPasswd.setStyle("-fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        ErrorPasswd.setVisible(false);

        switch (a.accedi()) {
            case 1:
                // Futura allert box
                break;
            case 2:
                textPasswd.setStyle("-fx-border-color: red");
                shake(textPasswd);
                ErrorPasswd.setVisible(true);
                break;


        }
    }


    public void Do_Registrati(ActionEvent actionEvent) {
        Registrazione reg = new Registrazione(textEmail.getText(), textNome.getText(), textPasswd.getText(), textRepPasswd.getText());

        switch (reg.registrati()) {
            case 1:
                textEmail.setStyle("-fx-border-color: red");
                shake(textEmail);
                //ErrorEmail.setVisible(true);
                break;

            case 2:
                textPasswd.setStyle("-fx-border-color: red");
                shake(textPasswd);
                //ErrorPasswd.setVisible(true);
                break;


            case 3:
                textRepPasswd.setStyle("-fx-border-color: red");
                shake(textRepPasswd);
                // ErrorRepPassword.setVisible(true);
                break;

            case 4:
                // Eventuale alert box per errori generali
                break;
        }
    }


    public void go_Registarti(ActionEvent actionEvent) throws IOException {
        AnchorPane pane = FXMLLoader.load(getClass().getResource("Registrazione.fxml"));
        rootPane.getChildren().setAll(pane);
    }

    public void go_Login(ActionEvent actionEvent) throws IOException {
        AnchorPane pane = FXMLLoader.load(getClass().getResource("Login.fxml"));
        rootPane.getChildren().setAll(pane);
    }


    private void shake(Node node) {
        TranslateTransition translateTransition = new TranslateTransition(Duration.millis(100), node);
        translateTransition.setByX(20);
        translateTransition.setCycleCount(4);
        translateTransition.setAutoReverse(true);
        translateTransition.playFromStart();
    }
}
