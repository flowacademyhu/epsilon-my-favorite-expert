package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.security.UserPrincipal;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.Assert.assertEquals;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;


    @Mock
    private SecurityContext mockSecurityContext;

    User user;
    UUID id = UUID.randomUUID();


    @Before
    public void setup() {
        user = new User();
        user.setId(id);
        user.setAddress(getAddress());
        UserPrincipal userPrincipal = UserPrincipal.create(user);

        Authentication auth = new UsernamePasswordAuthenticationToken(userPrincipal, null);
        SecurityContextHolder.getContext().setAuthentication(auth);

        when(userRepository.save(any(User.class))).thenReturn(user);

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
    @Test
    public void deleteExpert_ShouldReturnUser() {

    }


}
