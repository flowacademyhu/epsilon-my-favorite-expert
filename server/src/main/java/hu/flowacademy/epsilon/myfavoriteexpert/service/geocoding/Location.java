package hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Location {


    private Double lat;
    private Double lon;

}
