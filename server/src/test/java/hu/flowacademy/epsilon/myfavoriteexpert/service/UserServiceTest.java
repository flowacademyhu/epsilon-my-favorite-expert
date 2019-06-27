package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.security.UserPrincipal;
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
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ExpertRepository expertRepository;

    @Mock
    private SecurityContext mockSecurityContext;

    User user;
    UUID id = UUID.randomUUID();

    @Mock
    private GeoCodingService geoCodingService;

    @Before
    public void setup() {
        user = new User();
        user.setId(id);
        user.setAddress(getAddress());
        UserPrincipal userPrincipal = UserPrincipal.create(user);

        UUID expertId = UUID.randomUUID();
        Expert expert = new Expert();
        expert.setId(expertId);

        user.addExpert(expert.getId());

        Authentication auth = new UsernamePasswordAuthenticationToken(userPrincipal, null);
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userRepository.findById(id)).thenReturn(java.util.Optional.ofNullable(user));
       // when(expertRepository.findById(expertId)).thenReturn(java.util.Optional.of(expert));

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
    public void saveUser_ShouldReturnUser() {
        User userTest = userService.save(user);
        assertEquals(userTest, user);
    }

    @Test(expected = RuntimeException.class)
    public void saveAddress_ShouldThrowException() {
        userService.saveAddress(getAddress());
    }
    @Test
    public void saveAddress_ShouldReturnUser() {
        User userTest = new User();
        userTest.setAddress(getAddress());
        assertEquals(userTest.getAddress().toString(), user.getAddress().toString());
    }

    @Test(expected = RuntimeException.class)
    public void saveAddres_ShouldThrowRuntimeExeption() {
        Address address = new Address();
        address.setCountry("M");
        address.setCity("Ó");
        address.setStreet("Be utca");
        address.setNumber("4");

        userService.saveAddress(address);
    }

    @Test()
    public void saveAddress_shouldReturnUser() {
        Address address = new Address();
        address.setCountry("Magyarország");
        address.setCity("Szeged");
        address.setStreet("Vedres utca");
        address.setNumber("3");
        Location loc = new Location();
        loc.setLat(21.);
        loc.setLon(33.);
        user.setAddress(address);
        when(geoCodingService.getGeoCoding(address)).thenReturn(loc);
        assertEquals(userService.saveAddress(address),user);
    }

    @Test
    public void deleteExpert_ShouldReturnUser() {
        UUID id = UUID.randomUUID();
        UUID id2 = UUID.randomUUID();
        User userTest = user;
        userTest.addExpert(id);
        user.addExpert(id);
        user.addExpert(id2);
        assertEquals(userTest, userService.deleteExpert(user,id2));
    }

    @Test
    public void deleteFollower_ShouldReturnUser() {
        User userTest= user;
        user.addFollower(user.getId());
        user.addFollowedBy(user.getId());
        assertEquals(userService.deleteFollower(user,user.getId()),userTest);
    }


    @Test
    public void saveLanguageHU_ShouldReturnUser() {
        var testUser = user;
        testUser.setLanguage("HU");
        assertEquals(userService.saveLanguage("HU"), testUser);
    }

    @Test
    public void saveLanguageEN_ShouldReturnUser() {
        var testUser = user;
        testUser.setLanguage("EN");
        assertEquals(userService.saveLanguage("EN"), testUser);
    }






}
