package sample;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;

public abstract class API {

    public JSONObject JSON_parse(String json) {
        return new JSONObject(json);
    }

    public void request(String url, String... n)
    {
        String precedente = "";

        int cont = 0;

        try {

            URL urlForGetRequest = new URL("http://127.0.0.1:3000/prove");
            String readLine = null;
            HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
            conection.setRequestMethod("POST");
            for (String i: n) {
                if (cont % 2 == 0) {
                    precedente = i;
                } else {
                    conection.addRequestProperty(precedente, i);
                    System.out.println(precedente + i);
                }
                cont += 1;
            }


            int responseCode = conection.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                BufferedReader in = new BufferedReader(
                        new InputStreamReader(conection.getInputStream()));
                StringBuffer response = new StringBuffer();
                while ((readLine = in .readLine()) != null) {
                    response.append(readLine);
                    System.out.println(readLine);
                } in .close();
                // print result
                System.out.println("JSON String Result " + response);
                System.out.println();
                //GetAndPost.POSTRequest(response.toString());
            } else {
                System.out.println("GET NOT WORKED");
            }
        } catch (Exception e)
        {}
    }



}
