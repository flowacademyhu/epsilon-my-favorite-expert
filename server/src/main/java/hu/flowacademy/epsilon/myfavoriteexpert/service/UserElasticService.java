package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserElasticService {

    @Autowired
    private UserElasticRepository userElasticRepository;

    public UserElastic save(UserElastic userElastic) {
        return userElasticRepository.save(userElastic);
    }

    public Iterable<UserElastic> find() {
        return userElasticRepository.findAll();
    }

    public UserElastic findByid(String id) {
        return userElasticRepository.findById(UUID.fromString(id)).orElseThrow(RuntimeException::new);
    }

    public UserElastic saveAddress(String id, Address address) {
        UserElastic user = findByid(id);
        if (user == null) {
            throw new RuntimeException("User not found, id is invalid");
        } else {
            user.setAddress(address);
            user.setUpdated_at(LocalDateTime.now());
        }
        return userElasticRepository.save(user);
    }
}
