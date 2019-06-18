package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import org.apache.catalina.core.ApplicationContext;
import org.assertj.core.api.ListAssert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import static org.assertj.core.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RunWith(SpringRunner.class)
public class ExpertServiceTest {

    @MockBean
    private ExpertService expertService;

    @MockBean
    private UserService userService;

    @Mock
    private ExpertRepository expertRepository;

    @Test
    public void saveExpertTest() {
        Expert expert = new Expert();
        expert.setPhone("+36302121211");
        User user = new User();
        user.setAccessToken("23232");

        expertService.save("23232", expert);
        assertThat(expert.getPhone().equals("+36302121211"));
    }
    @Test
    public void deleteExpertFromRepo() {

        User user = new User();
        Expert expert = new Expert();
        user.setAccessToken("23232");
        UUID id = expert.getId();

        expertService.save("23232", expert);
        expertService.delete(id);

        assertThat(expertRepository.findById(id)).isEmpty();
    }
    @Test
    public void findExpertById() {
        User user = new User();
        Expert expert = new Expert();
        user.setAccessToken("23232");
        UUID id = expert.getId();

        expertService.save("23232", expert);
        assertThat(expertService.findById(id).equals(expert));
    }
    @Test
    public void findAllExperts() {
        User user = new User();
        user.setAccessToken("23232");

        Expert expert = new Expert();
        UUID id = expert.getId();
        Expert expert2 = new Expert();
        UUID id2 = expert.getId();

        expertService.save("23232", expert);
        expertService.save("23232", expert2);
        List list = new ArrayList();
        list.add(expert);
        list.add(expert2);

        assertThat(expertService.find().equals(list));
    }
//    @Test
//    public void userAddProfessionToExpert() {
//        User user = new User();
//        user.setAccessToken("23232");
//
//        Expert expert = new Expert();
//        UUID id = expert.getId();
//
//        List list = new ArrayList();
//        list.add("hentes");
//        list.add("ács");
//
//        expertService.save("23232", expert);
//        expertService.addProfession(id, "hentes");
//        expertService.addProfession(id, "ács");
//
//        assertThat(expertService.findById(id).get().getProfession().equals(list));
//    }
//    @Test
//    public void getFavoritExpertTest() {
//        User user = new User();
//        user.setAccessToken("23232");
//
//        Expert expert = new Expert();
//        UUID id = expert.getId();
//        Expert expert2 = new Expert();
//        UUID id2 = expert.getId();
//
//        expertService.save("23232", expert);
//        expertService.save("23232", expert2);
//
//        user.addExpert(id);
//        user.addExpert(id2);
//
//        assertThat(expertService.getFavoriteExperts("23232").equals(List.of(id, id2)));
//    }

}
