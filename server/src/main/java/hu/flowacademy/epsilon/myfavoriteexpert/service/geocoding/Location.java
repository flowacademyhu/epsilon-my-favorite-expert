package hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {


    private Double lat;
    private Double lon;

}
