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
        textEmail.setStyle("-fx-border-color: none");
        textPasswd.setStyle("-fx-border-color: none");


        switch (a.accedi()) {
            case 1:
                textEmail.setStyle("-fx-border-color: red");
                shake(textEmail);
                ErrorPasswd.setVisible(true);
                break;
            case 2:
                textPasswd.setStyle("-fx-border-color: red");
                shake(textPasswd);
                ErrorPasswd.setVisible(true);
                break;
        }
        /*
         if (a.accedi() == 3)
        {

        } else if (a.accedi() == 4)
        {

        }else if (a.accedi() == 5)
        {

        }else if (a.accedi() == 6)
        {

        } else if (a.accedi() == 7);
        {

        }
         */
    }


    public void Do_Registrati(ActionEvent actionEvent) {

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
