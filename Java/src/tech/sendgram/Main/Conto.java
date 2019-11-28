package tech.sendgram.Main;

import javafx.scene.control.Label;
import org.json.JSONObject;
import tech.sendgram.API.API;
import tech.sendgram.websocket.websocket;

import java.awt.*;

public class Conto extends API {
    private String nome;
    private static float saldo;
    private static String[][] transazioni;
    public static Label labelSaldo;

    public static void setTransazioni(String[][] transazioni) {
        Conto.transazioni = transazioni;
    }

    public Conto(String nome, float saldo, String[][] transazioni) {
        this.nome = nome;
        this.saldo = saldo;
        this.transazioni = transazioni;
    }

    public static String[][] getTransazioni() {
        return transazioni;
    }

    public static void setSaldo(float saldo) {
        Conto.saldo = saldo;
    }

    public static void newTrans(float importo, String destinatario) {
        if (saldo >= importo) {
            String jwt = websocket.getJWT();
            JSONObject req = request("http://173.249.41.169:3000/transazione", "POST", "re", "{\"new-trans\":true, \"destinatario\": \"" + destinatario + "\", \"importo\": " + importo + ",\"jwt\": \"" + jwt + "\"}");

            //websocket.sendNew("{\"new-trans\":true, \"destinatario\": " + destinatario + ", \"importo\": " + importo + "\"jwt\":"+jwt+"}");
        } else {
            Control.alert("Attenzione", "Impossibili eseguire transazione: saldo insufficiente");
        }
    }

    public static void refreshSaldo() {

        labelSaldo.setText(saldo + "$");
    }

}
