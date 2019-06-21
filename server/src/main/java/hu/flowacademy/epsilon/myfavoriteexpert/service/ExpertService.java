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
import java.util.stream.Collectors;

@Service
public class ExpertService {



    @Autowired
    private ExpertRepository expertRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    public Expert save(Expert expert) {
        var expertid = UUID.randomUUID();
        expert.setId(expertid);
        expert.setCreatedAt(LocalDateTime.now());

        User user = userService.findByid();
        user.addExpert(expertid);
        userService.save(user);
        return expertRepository.save(expert);

    }

    public Expert findById(UUID id) {
        Optional<Expert> expert = expertRepository.findById(id);
        if (expert.isPresent()) {
            return expert.get();
        } else {
            return null;
        }
    }


    public List<Expert> find() {
        return expertRepository.findAll(Pageable.unpaged()).getContent();
    }

    public void delete(UUID id) {
        Optional<Expert> expert = expertRepository.findById(id);
        if (expert.isPresent()) {
            expert.get().setDeletedAt(LocalDateTime.now());
            expertRepository.save(expert.get());
        } else {
            throw new RuntimeException("expert does not exist!");
        }
    }

    public void addProfession(UUID id, String profession) {
        expertRepository.findById(id).ifPresent(expert -> {
            expert.addProfession(profession);
            expertRepository.save(expert);
        });
    }

    public List<Expert> getFavoriteExperts() {
        return userService.findByid()
                .getExperts()
                .stream()
                .map(expertid -> expertRepository.findById(expertid).get())
                .collect(Collectors.toList());
    }





}
