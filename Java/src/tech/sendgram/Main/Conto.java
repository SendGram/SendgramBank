package tech.sendgram.Main;

public class Conto {
    public String nome;
    public float saldo;
    public String[] transazioni;

    public Conto(String nome, float saldo, String[] transazioni) {
        this.nome = nome;
        this.saldo = saldo;
        this.transazioni = transazioni;
    }

    public void newTrans(float importo, String destinatario) {
        if (this.saldo >= importo) {
            Variabili.socket.send("{\"new-trans\":true, \"destinatario\": " + destinatario + ", \"importo\": " + importo + "}");
        } else {
            Control.alert("Attenzione", "Impossibili eseguire transazione: saldo insufficiente");
        }
    }

}
