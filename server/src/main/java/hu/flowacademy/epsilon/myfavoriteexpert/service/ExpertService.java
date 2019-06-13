package hu.flowacademy.epsilon.myfavoriteexpert.service;


import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
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
    private UserElasticRepository userElasticRepository;

    @Autowired
    private UserElasticService userElasticService;

    public Expert save(Expert expert) {
        expert.setId(UUID.randomUUID());
        expert.setCreated_at(LocalDateTime.now());
        return expertRepository.save(expert);

    }

    public Optional<Expert> findById(UUID id) {
        return expertRepository.findById(id);
    }

    public Iterable<Expert> list() {
        return expertRepository.findAll();
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
            expert.get().setProfession(List.of(profession));
            expertRepository.save(expert.get());
        }
    }

    public List<Expert> getFavoriteExperts(String accestoken) {
        UserElastic user = userElasticService.findByid(accestoken);
        List<Expert> favoriteExperts = new ArrayList();
        for (var expertid: user.getExperts()) {
            Optional<Expert> expert = expertRepository.findById(expertid);
            if (expert.isPresent()) {
                favoriteExperts.add(expert.get());
            }
        }
        return favoriteExperts;
    }



}
