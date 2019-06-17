package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ExpertService {



    @Autowired
    private ExpertRepository expertRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Expert save(String accestoken,Expert expert) {
        var expertid = UUID.randomUUID();
        expert.setId(expertid);
        expert.setCreated_at(LocalDateTime.now());

        User user = userService.findByid(accestoken);
        user.addExpert(expertid);
        userService.save(user);
        return expertRepository.save(expert);

    }

    public Optional<Expert> findById(UUID id) {
        return expertRepository.findById(id);
    }


    public List<Expert> find() {
        return expertRepository.findAll(Pageable.unpaged()).getContent();
    }

    public void delete(UUID id) {
        Optional<Expert> expert = expertRepository.findById(id);
        if (expert.isPresent()) {
            expert.get().setDeleted_at(LocalDateTime.now());
            expertRepository.save(expert.get());
        } else {
            throw new RuntimeException("expert does not exist!");
        }
    }

    public void addProfession(UUID id, String profession) {
        Optional<Expert> expert = expertRepository.findById(id);
        if(expert.isPresent()) {
            expert.get().addProfession(profession);
        }
    }

    public List<Expert> getFavoriteExperts(String accestoken) {
        User user = userService.findByid(accestoken);
        List<Expert> favoriteExperts = new ArrayList();
        if (user.getExperts() == null)
            return List.of();
        for (var expertid: user.getExperts()) {
            Optional<Expert> expert = expertRepository.findById(expertid);
            if (expert.isPresent()) {
                favoriteExperts.add(expert.get());
            }
        }
        return favoriteExperts;
    }





}
