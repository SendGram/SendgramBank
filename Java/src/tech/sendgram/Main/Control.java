package tech.sendgram.Main;

import javafx.application.Platform;
import javafx.scene.control.Alert;

import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.regex.Pattern;

public class Control {

    public static boolean isFace() {
        File f = new File("face.txt");
        if (f.exists() && !f.isDirectory()) {
            return true;
        } else
            return false;
    }
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

    public static void notifica(String titolo, String testo) throws IOException {

        if (Control.isFace()) {
            Process p = Runtime.getRuntime().exec(new String[]{"bash", "-c", "echo '" + testo + "' | terminal-notifier -sound default -title " + titolo});

        }

        try {

            SystemTray tray = SystemTray.getSystemTray();
            Image image = Toolkit.getDefaultToolkit().createImage("some-icon.png");
            TrayIcon trayIcon = new TrayIcon(image, "Java AWT Tray Demo");
            //Let the system resize the image if needed
            trayIcon.setImageAutoSize(true);
            //Set tooltip text for the tray icon
            trayIcon.setToolTip("System tray icon demo");
            tray.add(trayIcon);


            trayIcon.displayMessage(titolo, testo, TrayIcon.MessageType.INFO);
        } catch (Exception ex) {
            System.err.print(ex);
        }
    }

    public static void alert(String titolo, String messaggio) {

        Platform.runLater(
                () -> {
                    Alert alert = new Alert(Alert.AlertType.INFORMATION);
                    alert.setTitle(titolo);
                    alert.setHeaderText(null);
                    alert.setContentText(messaggio);
                    alert.showAndWait();

                }
        );
    }
}
