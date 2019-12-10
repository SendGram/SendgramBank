package tech.sendgram.DashboardForm;

public class Person {

    private String data = null;
    private String importo = null;
    private String mittente = null;
    private String destinatario = null;

    public Person() {
    }

    public Person(String data, String importo, String mittente, String destinatario) {
        this.data = data;
        this.importo = importo;
        this.mittente = mittente;
        this.destinatario = destinatario;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getImporto() {
        return importo;
    }

    public void setImporto(String importo) {
        this.importo = importo;
    }

    public String getMittente() {
        return mittente;
    }

    public void setMittente(String mittente) {
        this.mittente = mittente;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }
}