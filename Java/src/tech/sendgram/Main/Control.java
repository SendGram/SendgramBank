package tech.sendgram.Main;

import javafx.geometry.Pos;
import javafx.scene.control.Alert;
import javafx.scene.control.ContentDisplay;
import javafx.scene.control.Label;
import javafx.scene.control.ProgressIndicator;

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


    public static void alert(String titolo, String messaggio) {
        Alert alert = new Alert(Alert.AlertType.INFORMATION);
        alert.setTitle(titolo);
        alert.setHeaderText(null);
        alert.setContentText(messaggio);
        Label loader = new Label("LOADING");
        loader.setContentDisplay(ContentDisplay.BOTTOM);
        loader.setGraphic(new ProgressIndicator());
        alert.getDialogPane().setGraphic(loader);
        loader.setAlignment(Pos.CENTER);
        alert.showAndWait();
    }
}
