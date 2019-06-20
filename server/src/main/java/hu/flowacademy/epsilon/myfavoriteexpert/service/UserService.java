package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.exception.UserNotAuthenticatedExeption;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Language;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {



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
            user.setAddress(address);
            user.setUpdatedAt(LocalDateTime.now());
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
        } else {
            if(language.equalsIgnoreCase(Language.HU.toString())){
                user.setLanguage("HU");
            }
            if(language.equalsIgnoreCase(Language.EN.toString())){
                user.setLanguage("EN");
            }

        }
        return userRepository.save(user);
    }
}
