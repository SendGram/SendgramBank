package tech.sendgram.websocket;

/*
 @autore: Alessandro Caldonazzi
 */


import java.io.*;
import java.util.UUID;

import java.net.URI;
import java.util.ArrayList;

import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import org.java_websocket.WebSocket;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import tech.sendgram.Main.Conto;
import tech.sendgram.Main.Control;
import tech.sendgram.Main.Main;
import tech.sendgram.Main.Variabili;

import static tech.sendgram.API.API.request;


public class websocket extends WebSocketClient {

    public static ArrayList<String> mex = new ArrayList<>();
    public websocket(URI serverURI) {
        super(serverURI);
    }

    public static String getJWT() {
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
        if (Variabili.InLogin) {
            send("{\"FaceLogin\": \"" + Variabili.uuid + "\"}");

        } else {
            String jwt = getJWT();

            if (jwt != "errore") {
                send("{\"login\": \"" + jwt + "\"}");
            }
        }



    }

    public static void sendNew(String messaggio) {
        mex.add(messaggio);
        System.out.println("[+] Nuovo messaggio aggiunto alla coda di invio");
    }

    //handle function message
    @Override
    public void onMessage(String message) {
        if (Variabili.InLogin) {
            if (message.contains("facelogin")) {
                try {
                    JSONObject jsonObject1 = new JSONObject(message);

                    System.out.println(jsonObject1.getString("facelogin"));
                    if (jsonObject1.getBoolean("facelogin")) {
                        System.out.println("ok");
                        try {
                            PrintWriter writer = new PrintWriter("JWT.txt", "UTF-8");
                            writer.println(jsonObject1.getString("jwt"));
                            writer.close();
                            System.out.println("JWT Salvato");
                            Variabili.socket = new websocket(new URI("ws://173.249.41.169:8080"));
                            Variabili.socket.connect();
                            Variabili.InClose = true;
                            close();
                            Variabili.InLogin = false;
                        } catch (Exception e) {
                            System.out.println(e);
                            Control.alert("Login", "Il sistema non è riuscito ad identificare la tua faccia");
                            Variabili.InLogin = false;
                        }
                    } else {
                        Control.alert("Login", "Il sistema non è riuscito ad identificare la tua facciaa");
                        Variabili.InLogin = false;
                    }
                    System.out.println("ricevuto in login: " + message);
                } catch (Exception e) {
                    System.out.println(e);
                    System.out.println("qui");
                    Variabili.InLogin = false;
                }
            }
        } else {
            if (!message.contains("rss")) {

                try {
                    JSONObject jsonObject = new JSONObject(message);
                    System.out.println("ricevuto: " + message);
                    if (message.contains("login")) {


                        if (jsonObject.getString("login").equals("true")) {
                            //setta saldo
                            String[][] vett = new String[100][100];
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
                    } else if (message.contains("face-trans")) {
                        if (jsonObject.getBoolean("face-trans")) {
                            String jwt = websocket.getJWT();
                            Control.notifica("Riconoscimento Facciale", "Buone notizie,  abbiamo riconosciuto la tua faccia, procediamo con la transazione");
                            JSONObject req = request("http://173.249.41.169:3000/transazione", "POST", "re", "{\"new-trans\":true, \"destinatario\": \"" + Conto.dest_attesa + "\", \"importo\": " + Conto.importo_attesa + ",\"jwt\": \"" + jwt + "\"}");
                            Conto.importo_attesa = 0;
                            Conto.dest_attesa = "";
                        } else {
                            Control.notifica("Riconoscimento Facciale", "Cattive notizie,  non abbiamo riconosciuto la tua faccia, la transazione verrà rifiutata");
                        }
                    } else if (message.contains("saldo")) {
                        //setta saldo
                        Conto.setSaldo(jsonObject.getFloat("saldo"));
                        Conto.refreshSaldo();
                    } else if (message.contains("transazioni")) {
                        String[][] vett = new String[100][100];
                        JSONArray a = jsonObject.getJSONArray("transazioni");
                        for (int i = 0; i < a.length(); i++) {
                            JSONArray obj = a.getJSONArray(i);
                            for (int j = 0; j < obj.length(); j++) {
                                vett[i][j] = obj.getString(j);

                            }
                        }
                        Conto.setTransazioni(vett);
                    } else if (message.contains("confirm-trans")) {
                        Control.notifica("Transazione confermata", "Buone notizie la tua transazione è stata confermata");
                    } else if (message.contains("new-trans")) {
                        Control.notifica("Nuova transazione", "Buone notizie abbiamo individuato una nuova transazione");
                    }
                } catch (JSONException | IOException err) {
                    System.out.print("Error" + err);
                }

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
        if (!Variabili.InClose) {
            String jwt = getJWT();
            if (jwt != "errore") {
                send("{\"logout\": \"" + jwt + "\"}");
            }
        }


    }

    @Override
    public void onError(Exception ex) {
        //errore
        ex.printStackTrace();

    }


}