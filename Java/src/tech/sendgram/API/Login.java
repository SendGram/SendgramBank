package tech.sendgram.API;

import org.json.JSONObject;
import tech.sendgram.Main.Controlli;

import java.util.regex.Pattern;

public class Login extends API {

    private String email;
    private String passwd;

    public Login(String emil, String password) {
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
        } else if (req.has("errore")) {
            switch (req.getString("errore")) {
                case "User not found":
                    //utente non trovato API
                    System.out.println("utente non trovato");
                    break;

                case "wrong password":
                    //password sbagliata API
                    System.out.println("password sbagliata");
                    break;
            }
        } else if (req.has("successo")) {
            String JWT = req.getString("successo");
            if (writeJwt(JWT)) {
                //JWT salvato
                System.out.println("JWT salvato");
            } else {
                //errore salvando JWT
                System.out.println("Errore salvataggio JWT");

            }
        } else {
            //errore
            System.out.println("errore");
        }


        return 0;
    }


}
