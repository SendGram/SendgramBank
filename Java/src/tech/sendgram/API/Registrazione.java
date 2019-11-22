package tech.sendgram.API;

import org.json.JSONObject;
import tech.sendgram.Main.Control;

// Return 1 = Errore caratteri speciali
// Return 2 = Errore password troppo lunga o troppo corta
// Return 3 = password non uguali
// Return 4 = errore generico
// Return 5 = utente gia presente
public class Registrazione extends API {

    private String email;
    private String nome;
    private String passwd;
    private String repPasswd;

    public Registrazione(String email, String nome, String passwd, String repPasswd) {
        this.email = email;
        this.nome = nome;
        this.passwd = passwd;
        this.repPasswd = repPasswd;
    }

    public int registrati() {

        if (Control.checkSpecialChar(email))
            return 1; // Errore caratteri speciali

        if (Control.checkStringLenght(passwd, 7, 19))
            return 2; // Errore password troppo lunga o troppo corta

        if (Control.checkEqualsString(passwd, repPasswd))
            return 3;

        JSONObject req = request("http://127.0.0.1:3000/registrazione", "POST", "email", email, "nome", nome, "passwd", passwd);

        return controlReg(req);
    }


    private int controlReg(JSONObject req) {


        if (req.has("errorJ")) {
            //error display
            System.out.println("errore");
            return 4; // Errore generico

        } else if (req.has("errore")) {
            switch (req.getString("errore")) {

                case "Utente già presente":
                    //Utente gia presente API
                    return 5; // Utente gia presente
            }
        } else if (req.has("successo")) {
            String JWT = req.getString("successo");
            if (writeJwt(JWT)) {
                //JWT salvato
                System.out.println("JWT salvato");


            } else {
                //errore salvando JWT
                System.out.println("Errore salvataggio JWT");
                return 4; // Errore generico
            }
        } else {
            //errore
            System.out.println("errore");
            return 4; // Errore generico
        }

        return 0;
    }

}
