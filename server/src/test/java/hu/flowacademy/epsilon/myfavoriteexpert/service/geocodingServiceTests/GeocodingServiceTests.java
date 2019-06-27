package hu.flowacademy.epsilon.myfavoriteexpert.service.geocodingServiceTests;

import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.GeoCodingService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.Location;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
public class GeocodingServiceTests {

    @TestConfiguration
    static class geoCodingTestContextConfiguration {

        @Bean
        public GeoCodingService employeeService() {
            return new GeoCodingService();
        }
    }

    @Autowired
    private GeoCodingService geoCodingService=new GeoCodingService();


    @Test
    public void givenNullDistance_ExpectNullDistance() {
        Location location1= Location.builder().lat(0.2).lon(0.2).build();
        Location location2= Location.builder().lat(0.2).lon(0.2).build();
        assertEquals(geoCodingService.distance(location1,location2),Long.valueOf(0));
    }
}
