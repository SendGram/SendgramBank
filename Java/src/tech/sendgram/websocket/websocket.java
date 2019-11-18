package tech.sendgram.websocket;

/*
 @autore: Alessandro Caldonazzi
 */

import java.net.URI;

import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

public class websocket extends WebSocketClient {


    public websocket(URI serverURI) {
        super(serverURI);
    }


    @Override
    public void onOpen(ServerHandshake handshakedata) {
        send("Hello, it is me. Mario :)");

        System.out.println("connessione aperta");
    }

    @Override
    public void onMessage(String message) {
        if (!message.contains("rss")) {
            System.out.println("received: " + message);
        }

    }

    @Override
    public void onClose(int code, String reason, boolean remote) {
        // chiusura websocket
        System.out.println("Connessione chiusa");
    }

    @Override
    public void onError(Exception ex) {
        //errore
        ex.printStackTrace();

    }


}