package tech.sendgram.API;

import org.json.JSONObject;
import tech.sendgram.Main.Controlli;

// Return 1 = Caratteri speciali nella email
// Return 2 = Caratteri della password inferiori a 8 o superiori a 20
// Return 3 = Errore sconosciuto
// Return 4 = Utente non trovato
// Return 5 = Password sbagliata
// Return 6 = Errore sconosiuto
// Return 7 = Errore sconosiuto
public class Registrazione extends API {

    private String email;
    private String passwd;

    public Registrazione(String emil, String password) {
        this.email = emil;
        this.passwd = password;
    }

    public int accedi() {

        if (Controlli.checkSpecialChar(email))
            return 1;

        if (Controlli.checkStringLenght(passwd, 8, 20))
            return 2;

        JSONObject req = request("http://127.0.0.1:3000/login", "POST", "email", email, "passwd", passwd);
        if (req.has("errorJ")) {
            //error display
            System.out.println("errore");
            return 3;
        } else if (req.has("errore")) {
            switch (req.getString("errore")) {

                case "wrong password":
                    //password sbagliata API
                    System.out.println("password sbagliata");
                    return 5;
            }
        } else if (req.has("successo")) {
            String JWT = req.getString("successo");
            if (writeJwt(JWT)) {
                //JWT salvato
                System.out.println("JWT salvato");

            } else {
                //errore salvando JWT
                System.out.println("Errore salvataggio JWT");
                return 6;
            }
        } else {
            //errore
            System.out.println("errore");
            return 7;
        }


        return 0;
    }


}
