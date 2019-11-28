package tech.sendgram.Main;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ContentDisplay;
import javafx.scene.control.Dialog;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressIndicator;
import javafx.scene.effect.DropShadow;
import javafx.scene.paint.Color;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import tech.sendgram.websocket.websocket;

import java.net.URI;


public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("../DashboardForm/DashboardSaldo.fxml"));
        primaryStage.setTitle("SendgramBank");
        primaryStage.setScene(new Scene(root));
        primaryStage.setMinWidth(800);
        primaryStage.setMinHeight(500);
        primaryStage.setMaxWidth(800);
        primaryStage.setMaxHeight(500);
        primaryStage.show();
        Variabili.socket = new websocket(new URI("ws://localhost:8080"));
        Variabili.socket.connect();
        Control.alert("A", "AAA");


    }


    public static void main(String[] args) {

        launch(args);


    }
}
