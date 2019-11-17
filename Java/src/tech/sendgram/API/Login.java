package tech.sendgram.API;

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
        /*
        if (Controlli.checkSpecialChar(email))
            return 1;

        if (Controlli.checkStringLenght(passwd, 8, 20))
            return 2;
*/
        request("http://127.0.0.1:3000/login", "POST", "email", email, "passwd", passwd);

        return 0;
    }


}
