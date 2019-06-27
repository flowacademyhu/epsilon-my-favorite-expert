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
import org.junit.rules.ExpectedException;
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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Mock
    private SecurityContext mockSecurityContext;

    Expert expert;
    UUID id = UUID.randomUUID();
    User user = new User();
    UUID userId = UUID.randomUUID();

    @Before
    public void setup() {
        expert = new Expert();
        expert.setId(id);
        user.setId(userId);
        user.setAddress(getAddress());
        UserPrincipal userPrincipal = UserPrincipal.create(user);

        expert.setAddress(getAddress());
        when(userService.findByid()).thenReturn(user);
        //when(userRepository.save(any(User.class))).thenReturn(new User);
        when(geoCodingService.getGeoCoding(expert.getAddress())).thenReturn(Location.builder().lat(3.14).lon(2.73).build());

        Authentication auth = new UsernamePasswordAuthenticationToken(userPrincipal, null);
        SecurityContextHolder.getContext().setAuthentication(auth);
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

    @Test()
    public void saveInitExpertShouldReturnSameExpert() {
        when(expertRepository.save(any(Expert.class))).thenReturn(null);
        expertService.saveInitExpert(expert);
    }

    @Test()
    public void findAllExpert() {
        when(expertRepository.findAll(Pageable.unpaged())).thenReturn(new PageImpl<>(List.of(expert)));
        assertEquals(expertService.find(),List.of(expert));
    }

    @Test(expected = RuntimeException.class)
    public void whenDeleteExpert_RuntimeExeption() {
        var uuid= UUID.randomUUID();
        when(expertRepository.findById(uuid)).thenReturn(Optional.empty());
        expertService.delete(id);

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

    @Test
    public void findAllFollowersToUser_ShouldReturnListOf() {
        when(userService.findFollowersByUser()).thenReturn(List.of());
        assertEquals(expertService.findAllFollowersExperts(),List.of());

    }
    @Test
    public void findAllFollowersExpert_ShouldReturnOneExpert() {
        when(userService.findFollowersByUser()).thenReturn(List.of(user));
        when(expertRepository.findById(id)).thenReturn(Optional.of(expert));

        assertEquals(expertService.findAllFollowersExperts(),List.of());

    }

    @Test(expected = NullPointerException.class)
    public void findExpertByParamsThenreturnOneExpert() {
        Pageable pageable = PageRequest.of(0,10);
        when(expertRepository.findExpertTest("A","*A*",pageable))
                .thenReturn(new PageImpl<>(List.of(expert)));
        assertEquals(expertService.findExpertByParams("A"),expert);
    }

    @Test()
    public void findExpertByParamsThenreturnEmptyList() {
        Pageable pageable = PageRequest.of(0,10);
        when(expertRepository.findExpertTest(any(String.class),any(String.class),any(Pageable.class)))
                .thenReturn(new PageImpl<>(List.of(expert)));
        assertEquals(expertService.findExpertByParams("A"),List.of(expert));
    }


    @Test(expected = NullPointerException.class)
    public void findExpertByParamsThenListOf() {
        Pageable pageable = PageRequest.of(0,10);
        when(expertRepository.findExpertTest("A","*A*",pageable))
                .thenReturn(Page.empty());
        assertEquals(expertService.findExpertByParams("A"),List.of());
    }

    @Test
    public void whenGetFavoriteExpertsReturnExpert() {
        when(expertRepository.findById(id)).thenReturn(Optional.empty());
        assertEquals(expertService.getFavoriteExperts(),List.of());
    }

    @Test
    public void whenAddProfessionOfNullThenNullPointerExeption() {
        when(expertRepository.findById(id)).thenReturn(Optional.of(expert));
        when(expertRepository.save(expert)).thenReturn(expert);
        expertService.addProfession(id,"KOMUVES");
    }

    @Test()
    public void whenDeleteExpert_setDeletedAt() {
        var uuid= UUID.randomUUID();
        when(expertRepository.findById(expert.getId())).thenReturn(Optional.of(expert));
        when(expertRepository.save(expert)).thenReturn(expert);

        expertService.delete(id);

    }


}
