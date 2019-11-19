package tech.sendgram.Main;

import java.util.regex.Pattern;

public class Controlli {

    public static boolean checkSpecialChar(String string) {
        Pattern regex = Pattern.compile("[$&+,:;=\\?#|/'<>^*()%!/]");
        return regex.matcher(string).find();
    }

    public static boolean checkStringLenght(String string, int maxLenght, int minLeght) {
        return (string.length() > maxLenght && string.length() < minLeght) ? false : true;
    }


}
