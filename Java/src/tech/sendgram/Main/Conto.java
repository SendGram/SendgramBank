package tech.sendgram.Main;

import javafx.application.Platform;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import org.json.JSONObject;
import tech.sendgram.API.API;
import tech.sendgram.websocket.websocket;

import java.awt.*;
import java.io.IOException;
import java.net.URI;

public class Conto extends API {
    private static String nome;
    private static float saldo;
    private static String[][] transazioni;
    public static Label labelSaldo;
    public static Label labelNome;
    public static String dest_attesa;
    public static float importo_attesa;

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

    public static void setSaldo(float sal) {
        saldo = sal;
    }

    public static void newTrans(float importo, String destinatario) {
        if (saldo >= importo) {
            String jwt = websocket.getJWT();
            if (Control.isFace()) {
                try {
                    Process p = Runtime.getRuntime().exec(new String[]{"bash", "-c", "open -a \"Google Chrome\" --args --user-data-dir=\"/tmp/chrome_dev_test\" --disable-web-security http://localhost:3000/?jwt=" + jwt});
                    dest_attesa = destinatario;
                    importo_attesa = importo;
                } catch (Exception e) {
                    System.out.println(e);
                }
            } else {
                JSONObject req = request("http://173.249.41.169:3000/transazione", "POST", "re", "{\"new-trans\":true, \"destinatario\": \"" + destinatario + "\", \"importo\": " + importo + ",\"jwt\": \"" + jwt + "\"}");

                //websocket.sendNew("{\"new-trans\":true, \"destinatario\": " + destinatario + ", \"importo\": " + importo + "\"jwt\":"+jwt+"}");
            }


        } else {
            Control.alert("Attenzione", "Impossibili eseguire transazione: saldo insufficiente");
        }
    }

    public static void refreshSaldo() {
        Platform.runLater(
                () -> {
                    labelSaldo.setText(saldo + "$");
                }
        );
    }

    public static void refreshNome()
    {
        Platform.runLater(
                () -> {
                    labelNome.setText(nome);
                }
        );
    }

}
