package tech.sendgram.API;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import netscape.javascript.JSObject;
import org.json.JSONArray;
import org.json.JSONObject;

public class API {


    public static JSONObject request(String url, String method, String... parametri) {
        String precedente = "";

        int cont = 0;

        try {

            URL urlForGetRequest = new URL(url);
            String readLine = null;
            HttpURLConnection connection = (HttpURLConnection) urlForGetRequest.openConnection();
            connection.setRequestMethod(method);
            for (String i : parametri) {
                if (cont % 2 == 0) {
                    precedente = i;
                } else {
                    connection.addRequestProperty(precedente, i);
                    System.out.println(precedente + i);
                }
                cont += 1;
            }


            int responseCode = connection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                String response = "";
                while ((readLine = in.readLine()) != null) {
                    response += readLine;
                    System.out.println(readLine);
                }
                in.close();
                return new JSONObject(response);
            } else {
                return new JSONObject("{ \"errore\": \"true\" }");
            }
        } catch (Exception e) {
            return new JSONObject("{ \"errore\": \"true\" }");
        }
    }


}
