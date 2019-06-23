package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.GeoCodingService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.Location;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ExpertService {


    @Autowired
    private GeoCodingService geoCodingService;

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
        expert.setLocation(geoCodingService.getGeoCoding(expert.getAddress()));

        User user = userService.findByid();
        user.addExpert(expertid);

        userService.save(user);
        expert= setExpertDistance(expert);
        return expertRepository.save(expert);

    }

    public void saveInitExpert(Expert expert) {
        var expertId = UUID.randomUUID();
        expert.setId(expertId);
        expert.setCreatedAt(LocalDateTime.now());
        expert.setLocation(geoCodingService.getGeoCoding(expert.getAddress()));
        expertRepository.save(expert);
    }

    public Expert findById(UUID id) {
        Expert expert = expertRepository.findById(id).orElse(null);
        if (expert != null) {
            return setExpertDistance(expert);
        }
        throw new RuntimeException("expert does not exist!");
    }


    public List<Expert> find() {
        var experts = expertRepository.findAll(Pageable.unpaged()).getContent();
        experts =  setExpertDistance(experts);
        return experts;
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
        var experts = userService.findByid()
                .getExperts()
                .stream()
                .map(expertid -> expertRepository.findById(expertid).get())
                .collect(Collectors.toList());
        return setExpertDistance(experts);
    }

    public List<Expert> findExpertByParams(String searchParams) {
        Pageable pageable = PageRequest.of(0,10);
        searchParams = searchParams.replaceAll("_"," ");
        String searchPartialInWords = "*" + searchParams.replaceAll(" ","* *")+ "*";
        System.out.println(searchPartialInWords);
        var experts = expertRepository.findExpertTest(searchParams,searchPartialInWords,pageable).getContent();
        experts = setExpertDistance(experts);
        return experts;
    }

    public List<Expert> setExpertDistance(List<Expert> experts) {
        User user = userService.findByid();
        if (user != null && user.getLocationByAddress() != null) {
            experts.stream().forEach(expert -> expert.setDistanceMeter(Math.round(geoCodingService.distance(user.getLocationByAddress(),expert.getLocation()))));
          // experts = experts.stream().sorted(Comparator.comparingDouble(Expert::getDistanceMeter)).collect(Collectors.toList());
        }
        return experts;
    }

    public Expert setExpertDistance(Expert expert) {
        User user = userService.findByid();
        if (user != null && user.getLocationByAddress() != null) {
            expert.setDistanceMeter(Math.round(geoCodingService.distance(user.getLocationByAddress(),expert.getLocation())));
        }
        return expert;
    }





}
