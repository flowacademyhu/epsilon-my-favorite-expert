package hu.flowacademy.epsilon.myfavoriteexpert.service;

import com.google.common.io.CharStreams;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;

@Slf4j
@Service
public class GeoCodingService {

    public static void getGeoCoding() {
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet("https://nominatim.openstreetmap.org/search?country=Magyarorszag&city=Szeged&street=20%20Vedres%20utca&format=jsonv2");
        request.addHeader("accept", "application/json");

        try {
            HttpResponse response = client.execute(request);
//            String json = response.getEntity().getContent();
            var input = new InputStreamReader(response.getEntity().getContent());
            String data = CharStreams.toString(input);
            JsonParser parser = new JsonParser();
            JsonElement tradeElement = parser.parse(data);
            JsonArray jsonArray = tradeElement.getAsJsonArray();

            jsonArray.forEach(json ->log.info("json is: "+json));
            }
         catch (IOException e) {
            e.printStackTrace();
        }
    }
}
