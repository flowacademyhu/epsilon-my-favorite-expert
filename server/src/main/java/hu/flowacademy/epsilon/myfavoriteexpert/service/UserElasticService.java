package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
