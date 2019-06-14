package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class UserElasticService {



    @Autowired
    private UserElasticRepository userElasticRepository;

    public UserElastic save(UserElastic userElastic) {
        return userElasticRepository.save(userElastic);
    }

    public List<UserElastic> find() {
        return userElasticRepository.findAll(Pageable.unpaged()).getContent();
    }

    public UserElastic findByid(String accestoken) {

        return userElasticRepository.findById(getIdFromAccesToken(accestoken)).orElseThrow(RuntimeException::new);
    }

    public UserElastic saveAddress(String accestoken, Address address) {
        UserElastic user = userElasticRepository.findById(getIdFromAccesToken(accestoken)).orElseThrow(RuntimeException::new);
        if (user == null) {
            throw new RuntimeException("User not found, id is invalid");
        } else {
            user.setAddress(address);
            user.setUpdated_at(LocalDateTime.now());
        }
        return userElasticRepository.save(user);
    }

    public UserElastic deleteExpert(UserElastic user, UUID expertid) {
        user.deleteExpert(expertid);
        return userElasticRepository.save(user);
    }

    public UUID getIdFromAccesToken(String accestoken) {

        UUID userId = null;
        Iterable<UserElastic> users = userElasticRepository.findAll();
        for (var user: users) {
            if (user.getAccess_token().equals(accestoken)) {
                userId = user.getId();
            }
        }
        return userId;
//        return userElasticRepository.findAll(Pageable.unpaged()).get()
//                .filter(userElastic -> accestoken.equals(userElastic.getAccess_token()))
//                .findFirst().map(UserElastic::getId).orElse(null);
    }
}
