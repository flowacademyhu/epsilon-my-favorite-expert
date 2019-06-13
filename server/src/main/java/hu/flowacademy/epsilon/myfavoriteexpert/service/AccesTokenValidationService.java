package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AccesTokenValidationService {

    @Autowired
    private UserElasticRepository userElasticRepository;

    @Autowired
    private UserElasticService userElasticService;

    public String validateAccesToken(String accestoken) {
        Optional<UserElastic> user=userElasticRepository.findById(userElasticService.getIdFromAccesToken(accestoken));
        if (!user.isPresent()) {
            throw new RuntimeException("User doesn't exist");
        }
        if (user.get().getExpire_at().isAfter(LocalDateTime.now())) {
            throw new RuntimeException("Accestoken expired");
        }
        user.get().setExpire_at(user.get().getExpire_at().plusHours(1));
        userElasticRepository.save(user.get());
        return accestoken;
    }
}
