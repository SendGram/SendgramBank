package tech.sendgram.RegLogForm;

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

public class RegLogController {

    @FXML
    AnchorPane rootPane;

    @FXML
    private TextField textEmail, textNome, textPasswd, textRepPasswd;

    @FXML
    private Label errorPasswd, errorEmail, errorRepPasswd, errorNome;


    public void Do_Login(ActionEvent actionEvent) {

        Login a = new Login(textEmail.getText(), textPasswd.getText());
        textEmail.setStyle(" -fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        textPasswd.setStyle("-fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        errorPasswd.setVisible(false);

        switch (a.accedi()) {
            case 1:
                // Futura allert box
                break;
            case 2:
                textPasswd.setStyle("-fx-border-color: red");
                shake(textPasswd);
                errorPasswd.setVisible(true);
                break;


        }
    }


    public void Do_Registrati(ActionEvent actionEvent) {

        String email = textEmail.getText();
        String nome = textNome.getText();
        String passwd = textPasswd.getText();
        String repPassword = textRepPasswd.getText();

        textEmail.setStyle(" -fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        textPasswd.setStyle("-fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        textRepPasswd.setStyle("-fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");
        textNome.setStyle("-fx-border-color: #1d4769 #1d4769 #7d9cb6 #1d4769");

        errorPasswd.setVisible(false);
        errorEmail.setVisible(false);
        errorRepPasswd.setVisible(false);
        errorNome.setVisible(false);

        if (email.isEmpty()) {
            textEmail.setStyle("-fx-border-color: red");
            shake(textEmail);
            errorEmail.setText("*Inserire email");
            errorEmail.setVisible(true);
        } else if (nome.isEmpty()) {
            textNome.setStyle("-fx-border-color: red");
            shake(textNome);
            errorNome.setText("*Inserire nome");
            errorNome.setVisible(true);
        } else {

            Registrazione reg = new Registrazione(email, nome, passwd, repPassword);

            switch (reg.registrati()) {
                case 0:
                    System.out.println("Registrazione completata");
                    break;

                case 1:
                    textEmail.setStyle("-fx-border-color: red");
                    shake(textEmail);
                    errorEmail.setText("*L'email contiene caratteri speciali");
                    errorEmail.setVisible(true);
                    break;

                case 2:
                    textPasswd.setStyle("-fx-border-color: red");
                    shake(textPasswd);
                    errorPasswd.setText("*Password da 8-20 caratteri");
                    errorPasswd.setVisible(true);
                    break;


                case 3:
                    textRepPasswd.setStyle("-fx-border-color: red");
                    shake(textRepPasswd);
                    errorRepPasswd.setText("*Le password non coincidono");
                    errorRepPasswd.setVisible(true);
                    break;

                case 4:
                    // Eventuale alert box per errori generali
                    break;

                case 5:
                    textEmail.setStyle("-fx-border-color: red");
                    shake(textEmail);
                    errorEmail.setText("*Questa email è già utilizzata");
                    errorEmail.setVisible(true);
                    break;
            }
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
