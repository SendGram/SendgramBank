package tech.sendgram.Main;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
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
        primaryStage.setResizable(false);
        primaryStage.show();
//        Variabili.socket = new websocket(new URI("ws://localhost:8080"));
        // Variabili.socket.connect();
        Control.alert("A", "AAA");


    }


    public static void main(String[] args) {

        launch(args);


    }
}
