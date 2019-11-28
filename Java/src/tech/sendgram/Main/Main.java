package tech.sendgram.Main;

import javafx.application.Application;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import javafx.stage.StageStyle;
import tech.sendgram.websocket.websocket;


import javax.management.Notification;
import java.awt.*;
import java.net.URI;


public class Main extends Application {
    private static Stage primaryStage;
    @Override
    public void start(Stage primaryStage1) throws Exception {
        Parent root = FXMLLoader.load(getClass().getResource("../RegLogForm/Login.fxml"));
        primaryStage = primaryStage1;
        primaryStage.setTitle("SendgramBank");
        primaryStage.setScene(new Scene(root));
        primaryStage.setMinWidth(800);
        primaryStage.setMinHeight(500);
        primaryStage.setMaxWidth(800);
        primaryStage.setMaxHeight(500);
        primaryStage.setResizable(false);
        primaryStage.show();
        Variabili.socket = new websocket(new URI("ws://localhost:8080"));
        Variabili.socket.connect();


    }

    public static Stage getStage() {
        return primaryStage;
    }

    public static void main(String[] args) {

        launch(args);


    }
}
