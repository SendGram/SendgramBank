package sample;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public abstract class API {


    public void request(String url)
    {
       String precedente;

        try {

            URL urlForGetRequest = new URL("http://127.0.0.1:3000/prove");
            String readLine = null;
            HttpURLConnection conection = (HttpURLConnection) urlForGetRequest.openConnection();
            for (String i: n) {

            }
            conection.setRequestMethod("POST");
            conection.setRequestProperty();

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
