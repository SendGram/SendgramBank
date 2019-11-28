package tech.sendgram.websocket;

/*
 @autore: Alessandro Caldonazzi
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.URI;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;


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
            System.out.println("received: " + message);
        }

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