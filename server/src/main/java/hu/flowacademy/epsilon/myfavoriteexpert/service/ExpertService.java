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

        User user = userService.findByid();
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
            expert.get().setDeletedAt(LocalDateTime.now());
            expertRepository.save(expert.get());
        } else {
            throw new RuntimeException("expert does not exist!");
        }
    }

    public void addProfession(UUID id, String profession) {
        expertRepository.findById(id).ifPresent(expert -> {
            expert.addProfession(profession);
            expertRepository.save(expert);});
    }

    public List<Expert> getFavoriteExperts() {
        return userService.findByid()
                .getExperts()
                .stream()
                .map(expertid -> expertRepository.findById(expertid).get())
                .collect(Collectors.toList());
    }

    public List<Expert> findExpertTest(String searchParams) {
        Pageable pageable = PageRequest.of(0,10);
        searchParams.replaceAll("_"," ");
        //PROBA
        Address address = new Address();
        address.setCountry("Hungary");
        address.setCity("Szeged");
        address.setStreet("Vedres utca");

        Address address2 = new Address();
        address.setCountry("Hungary");
        address2.setCity("Szeged");
        address2.setStreet("Tópart");
        Location location2 = geoCodingService.getGeoCoding(address2);
        Location location=geoCodingService.getGeoCoding(address);
        log.info("distance"+ geoCodingService.distance(location,location2).toString());
        //PROBA VEGE
        return expertRepository.findExpertTest(searchParams,pageable).getContent();
    }





}
