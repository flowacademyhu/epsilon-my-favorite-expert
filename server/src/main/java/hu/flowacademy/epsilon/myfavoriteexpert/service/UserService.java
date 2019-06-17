package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {



    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public List<User> find() {
        return userRepository.findAll(Pageable.unpaged()).getContent();
    }

    public User findByid(String accestoken) {

        return userRepository.findById(getIdFromAccesToken(accestoken)).orElseThrow(RuntimeException::new);
    }

    public User saveAddress(String accestoken, Address address) {
        User user = userRepository.findById(getIdFromAccesToken(accestoken)).orElseThrow(RuntimeException::new);
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

    public UUID getIdFromAccesToken(String accestoken) {

        UUID userId = null;
        Iterable<User> users = userRepository.findAll();
        for (var user: users) {
            if (user.getAccessToken().equals(accestoken)) {
                userId = user.getId();
            }
        }
        return userId;
    }
}
