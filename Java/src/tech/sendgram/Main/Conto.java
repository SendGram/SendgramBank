package tech.sendgram.Main;

import javafx.scene.control.Label;

import java.awt.*;

public class Conto {
    private String nome;
    private static float saldo;
    private static String[][] transazioni;
    public static Label labelSaldo;

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
            Variabili.socket.send("{\"new-trans\":true, \"destinatario\": " + destinatario + ", \"importo\": " + importo + "}");
        } else {
            Control.alert("Attenzione", "Impossibili eseguire transazione: saldo insufficiente");
        }
    }

    public static void refreshSaldo() {

        labelSaldo.setText(saldo + "$");
    }

}
