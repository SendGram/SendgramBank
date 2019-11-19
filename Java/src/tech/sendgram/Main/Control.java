package tech.sendgram.Main;

import java.util.regex.Pattern;

public class Control {

    public static boolean checkSpecialChar(String string) {
        Pattern regex = Pattern.compile("[$&+,:;=\\?#|/'<>^*()%!/]");
        return regex.matcher(string).find();
    }

    public static boolean checkStringLenght(String string, int maxLenght, int minLeght) {
        return (string.length() > maxLenght && string.length() < minLeght) ? false : true;
    }

    public static boolean checkEqualsString(String string1, String string2) {
        return (string1.equals(string2)) ? false : true;
    }

}
