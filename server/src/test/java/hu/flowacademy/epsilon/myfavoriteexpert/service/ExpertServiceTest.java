package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.GeoCodingService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.Location;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class ExpertServiceTest {


    @InjectMocks
    private ExpertService expertService;

    @Mock
    private UserService userService;

    @Mock
    private ExpertRepository expertRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GeoCodingService geoCodingService;

    Expert expert;
    UUID id = UUID.randomUUID();

    @Before
    public void setup() {
        expert = new Expert();
        expert.setId(id);
        expert.setAddress(getAddress());
        when(userService.findByid()).thenReturn(new User());
        //when(userRepository.save(any(User.class))).thenReturn(new User);
        when(expertRepository.save(any(Expert.class))).thenReturn(expert);
        when(geoCodingService.getGeoCoding(expert.getAddress())).thenReturn(Location.builder().lat(3.14).lon(2.73).build());

    }

    private Address getAddress() {
        Address address = new Address();
        address.setCountry("Magyarország");
        address.setCity("Ópusztaszer");
        address.setStreet("Béke utca");
        address.setNumber("49");
        return address;
    }

    @Test
    public void whensaveExpert_ExpertShouldReturn() {
        Expert expertSaved = expertService.save(this.expert);
        assertEquals(expert, expertSaved);
    }

    @Test(expected = RuntimeException.class)
    public void whenSaveExpertWithoutAddress_ShouldThrowException() {
        Expert expert1 = new Expert();
        expertService.save(expert1);
    }
    @Test
    public void whenFindById_ShouldReturnExpert() {
        when(expertRepository.findById(id)).thenReturn(java.util.Optional.ofNullable(expert));
        Expert expert1 = expertService.findById(id);
        assertEquals(expert1, expert);
    }
    @Test(expected = RuntimeException.class)
    public void whenFindById_ShouldReturnNull(){
        UUID idtest = UUID.randomUUID();
        Expert expert1 = expertService.findById(idtest);
        assertEquals(expert1, expert);
    }

    @Test
    public void setLikes_ShouldReturnExpert() {
        expert.setLikes(2);
        Integer num = 2;
        assertEquals(num, expert.getLikes());
    }
}
