package tech.sendgram.websocket;

/*
 @autore: Alessandro Caldonazzi
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;

import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import tech.sendgram.Main.Conto;
import tech.sendgram.Main.Main;
import tech.sendgram.Main.Variabili;


public class websocket extends WebSocketClient {


    public websocket(URI serverURI) {
        super(serverURI);
    }

    public String getJWT() {
        File f = new File("JWT.txt");
        if (f.exists() && !f.isDirectory()) {
            //esiste il JWT lo invio a node

            try {
                BufferedReader brTest = new BufferedReader(new FileReader("JWT.txt"));
                String jwt = brTest.readLine();
                return jwt;

            } catch (Exception e) {
                System.out.println("error " + e);
                return "error";
            }

        } else {
            return "error";
        }
    }

    @Override
    public void onOpen(ServerHandshake handshakedata) {
        String jwt = getJWT();
        if (jwt != "errore") {
            send("{\"login\": \"" + jwt + "\"}");
        }

    }


    //handle function message
    @Override
    public void onMessage(String message) {
        if (!message.contains("rss")) {
            try {
                JSONObject jsonObject = new JSONObject(message);
                System.out.println("ricevuto: " + message);
                if (message.contains("login")) {


                    if (jsonObject.getString("login").equals("true")) {
                        //setta saldo
                        String[][] vett = new String[10][10];
                        JSONArray a = jsonObject.getJSONArray("transazioni");
                        for (int i = 0; i < a.length(); i++) {
                            JSONArray obj = a.getJSONArray(i);
                            for (int j = 0; j < obj.length(); j++) {
                                vett[i][j] = obj.getString(j);

                            }
                        }
                        Conto conto = new Conto(jsonObject.getString("nome"), jsonObject.getFloat("saldo"), vett);

                        changeScene("../DashboardForm/DashboardSaldo.fxml");
                    }
                } else if (message.contains("saldo")) {
                    //setta saldo
                    Conto.setSaldo(jsonObject.getFloat("saldo"));
                }
            } catch (JSONException | IOException err) {
                System.out.print("Error" + err);
            }

        }

    }

    public void changeScene(String fxml) throws IOException {

        Platform.runLater(
                () -> {
                    Parent pane = null;
                    try {
                        pane = FXMLLoader.load(
                                getClass().getResource(fxml));
                    } catch (IOException e) {
                        e.printStackTrace();
                    }

                    Scene scene = new Scene(pane);
                    Main.getStage().setScene(scene);
                }
        );
    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        // chiusura websocket

        String jwt = getJWT();
        if (jwt != "errore") {
            send("{\"logout\": \"" + jwt + "\"}");
        }
    }

    @Override
    public void onError(Exception ex) {
        //errore
        ex.printStackTrace();

    }


}