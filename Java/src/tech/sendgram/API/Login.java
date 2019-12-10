package tech.sendgram.API;

import org.json.JSONObject;
import tech.sendgram.Main.Control;
import tech.sendgram.Main.Variabili;
import tech.sendgram.websocket.websocket;

import java.net.URI;
import java.net.URISyntaxException;

// Return 1 = Errorri non defeiniti
// Return 2 = Password sbagliata



public class Login extends API {

    private String email;
    private String passwd;

    public Login(String emil, String password) {
        this.email = emil;
        this.passwd = password;
    }

    public int accedi() {

        JSONObject req = request("http://173.249.41.169:3000/login", "POST", "email", email, "passwd", passwd);

        return controlLogin(req);
    }


    private int controlLogin(JSONObject req) {

        if (req.has("errorJ")) {
            //error display
            System.out.println("1");
            return 1; // Errore generico


        } else if (req.has("errore")) {
            switch (req.getString("errore")) {

                case "wrong password":
                    //password sbagliata API
                    System.out.println("password sbagliata");
                    return 2; // Password errata
            }
        } else if (req.has("Successo")) {
            String JWT = req.getString("Successo");
            if (writeJwt(JWT)) {
                //JWT salvato
                //login automatico
                try {
                    Variabili.socket = new websocket(new URI("ws://173.249.41.169:8080"));
                    Variabili.socket.connect();

                } catch (Exception e) {
                    System.out.println(e);
                }


                System.out.println("JWT salvato");


            } else {
                //errore salvando JWT
                System.out.println("Errore salvataggio JWT");
                return 1; // Errore generico
            }
        } else {
            //errore
            System.out.println("2");
            return 1; // Errore generico
        }

        return 0;
    }

}

