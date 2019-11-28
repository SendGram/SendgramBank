package tech.sendgram.Main;

import javafx.scene.control.Label;

import java.awt.*;

public class Conto {
    private String nome;
    private static float saldo;
    private String[] transazioni;
    private Label labelSaldo;

    public Conto(String nome, float saldo, String[] transazioni) {
        this.nome = nome;
        this.saldo = saldo;
        this.transazioni = transazioni;
    }

    public Conto(Label label) {
        this.labelSaldo = label;
    }

    public static void newTrans(float importo, String destinatario) {
        if (saldo >= importo) {
            Variabili.socket.send("{\"new-trans\":true, \"destinatario\": " + destinatario + ", \"importo\": " + importo + "}");
        } else {
            Control.alert("Attenzione", "Impossibili eseguire transazione: saldo insufficiente");
        }
    }

    public static void refreshSaldo() {

    }

}
