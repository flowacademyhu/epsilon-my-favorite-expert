package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.exception.UserNotAuthenticatedExeption;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Language;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.security.UserPrincipal;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.GeoCodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private GeoCodingService geoCodingService;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExpertRepository expertRepository;

    public UserPrincipal getCurrentUser() {
        return Optional.ofNullable(SecurityContextHolder.getContext().getAuthentication())
                .map(Authentication::getPrincipal)
                .map(user -> (UserPrincipal) user)
                .orElseThrow(UserNotAuthenticatedExeption::new);
    }

    public UUID getCurrentUserId() {
        return getCurrentUser().getId();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> find() {
        return userRepository.findAll(Pageable.unpaged()).getContent();
    }

    public User findByid() {

        return userRepository.findById(getCurrentUserId()).orElseThrow(RuntimeException::new);
    }

    public User saveAddress(Address address) {
        User user = userRepository.findById(getCurrentUserId()).orElseThrow(RuntimeException::new);
        if (user == null) {
            throw new RuntimeException("User not found, id is invalid");
        } else {
            if (address != null) {
                user.setAddress(address);
                user.setUpdatedAt(LocalDateTime.now());
                if (address.getCity().length() < 2 || address.getCountry().length() < 2 ||
                        address.getStreet().length() < 2  || Double.isNaN(geoCodingService.getGeoCoding(address).getLon())) {
                    throw new RuntimeException("address is not valid!!!!!!!!");
                } else {
                    user.setLocationByAddress(geoCodingService.getGeoCoding(address));
                }
            }
        }
        return userRepository.save(user);
    }

    public User deleteExpert(User user, UUID expertid) {
        user.deleteExpert(expertid);
        return userRepository.save(user);
    }

    public User saveLanguage(String language) {
        User user = userRepository.findById(getCurrentUserId()).orElseThrow(RuntimeException::new);
        if (user == null) {
            throw new RuntimeException("User not found, id is invalid");
        }
        else if(user.getDeletedAt() != null ) {
            throw new RuntimeException("User not found, id is invalid");
        }
        else {
            if(language.equalsIgnoreCase(Language.HU.toString())){
                user.setLanguage("HU");
            }
            if(language.equalsIgnoreCase(Language.EN.toString())){
                user.setLanguage("EN");
            }

        }
        return userRepository.save(user);
    }
    public List<User> findBestMatchedUserByName(String searchParams) {
        Pageable pageable = PageRequest.of(0,1);
        searchParams = searchParams.replaceAll("_"," ");
        return userRepository.findBestMatchesUser(searchParams,pageable).getContent();
    }
    public List<Expert> findExpertsByUser(String searchParams) {
        Pageable pageable = PageRequest.of(0,1);
        searchParams = searchParams.replaceAll("_"," ");
        List<User> users = userRepository.findExpertsByUser(searchParams,pageable)
                .getContent();
        List<Expert> experts = new ArrayList<>();
        if (users.size() > 0) {

                 experts = users.get(0)
                    .getExperts()
                    .stream()
                    .map(expertId -> expertRepository.findById(expertId).orElse(null))
                    .collect(Collectors.toList());
        }
        return experts;
    }

    public List<Expert> findAllExperts(UUID userId){
        Pageable pageable = PageRequest.of(0, 1);
        User user = userRepository.findById(userId).orElse(null);
        List<Expert> experts = new ArrayList<>();
        if (user != null) {
            experts = user.getExperts().stream()
                    .map(expertid -> expertRepository
                            .findById(expertid).orElseThrow(RuntimeException::new))
                    .collect(Collectors.toList());
        }
        return experts;
    }
}
