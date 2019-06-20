package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.exception.UserNotAuthenticatedExeption;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.security.UserPrincipal;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.GeoCodingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private GeoCodingService geoCodingService;


    @Autowired
    private UserRepository userRepository;

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
                user.setLocationByAddress(geoCodingService.getGeoCoding(address));
            }
        }
        return userRepository.save(user);
    }

    public User deleteExpert(User user, UUID expertid) {
        user.deleteExpert(expertid);
        return userRepository.save(user);
    }
}
