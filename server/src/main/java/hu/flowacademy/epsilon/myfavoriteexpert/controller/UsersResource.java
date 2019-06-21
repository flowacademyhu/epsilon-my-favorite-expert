package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.service.ExpertService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping
public class UsersResource {

    @Autowired
    private UserService userService;

    @Autowired
    private ExpertService expertService;


    @GetMapping("/users")
    public List<User> getAll() {
        return userService.find();
    }


    @GetMapping("/user")
    public ResponseEntity<User> getById() {
        return ResponseEntity.ok(userService.findByid());
    }
    @PostMapping("user/address")
    public ResponseEntity<User> saveAddress(@RequestBody Address address) {
        return ResponseEntity.ok(userService.saveAddress(address));
    }
    @PostMapping("user/language")
    public ResponseEntity<User> saveLanguage(@RequestBody String language) {
        return ResponseEntity.ok(userService.saveLanguage(language));
    }

    @PutMapping("user/{expertid}")
    public ResponseEntity<User> addExpertToUser(@PathVariable UUID expertid) {
        User user = userService.findByid();
        if (user != null) {
            user.addExpert(expertid);
        }
        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("user/{expertid}")
    public ResponseEntity<User> deleteExpertFromUser(@PathVariable UUID expertid) {
        User user = userService.findByid();
        if (user == null) {
            throw new RuntimeException("User not found with this accestoken");
        } else {
            return ResponseEntity.ok(userService.deleteExpert(user,expertid));
        }
    }
}