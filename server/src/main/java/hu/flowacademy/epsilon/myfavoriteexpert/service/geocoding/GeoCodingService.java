package hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding;

import com.google.common.io.CharStreams;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Collection;
import java.util.List;
import java.util.stream.Stream;

@Slf4j
@Service
public class GeoCodingService {
    private final String BASE_URI = "https://nominatim.openstreetmap.org/search?";
    private final Integer EARTH_RADIUS = 6371;

    public Location getGeoCoding(Address address) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpGet request = new HttpGet(buildUriFromAddress(address));
        request.addHeader("accept", "application/json");

        try {
            HttpResponse response = client.execute(request);
            var input = new InputStreamReader(response.getEntity().getContent());
            String data = CharStreams.toString(input);
            JsonParser parser = new JsonParser();
            var locations = parser.parse(data).getAsJsonArray();
            Gson gson = new Gson();
            Double avgLat = 0.;
            Double avgLon = 0.;
            for (var location: locations) {
                avgLat += gson.fromJson(location,Location.class).getLat();
                avgLon += gson.fromJson(location,Location.class).getLon();
            }
            avgLat /= locations.size();
            avgLon /= locations.size();
            log.info("loc is: "+avgLat+ "  :  "+ avgLon);
            return new Location.LocationBuilder().lat(avgLat).lon(avgLon).build();

        }
         catch (IOException e) {
            e.printStackTrace();
        }
        throw new RuntimeException("Address is not valid");
    }

    private String buildUriFromAddress(Address address) {
        if (address == null) {
            throw new RuntimeException("Address is null");
        }
        StringBuilder builder = new StringBuilder(BASE_URI);
        if (address.getCountry()!= null) {
            builder.append("country="+address.getCountry());
        }
        if (address.getCity() != null) {
            builder.append("&city="+address.getCity());
        }
        if (address.getStreet() != null) {
            builder.append("&street="+address.getStreet().replaceAll(" ","%20"));
        }
        return builder.append("&format=jsonv2").toString();

    }

    public Long distance(Location startingLoc, Location endLocation) {
        if (startingLoc.getLon() == null || endLocation.getLon() == null) {
            throw new RuntimeException("Location is not valid");
        }

        Double latDistance = Math.toRadians(endLocation.getLat() - startingLoc.getLat());
        Double lonDistance = Math.toRadians(endLocation.getLon() - startingLoc.getLon());
        Double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(startingLoc.getLat())) * Math.cos(Math.toRadians(endLocation.getLat()))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        Double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return ((Double)(EARTH_RADIUS * c * 1000)).longValue();
    }
}
