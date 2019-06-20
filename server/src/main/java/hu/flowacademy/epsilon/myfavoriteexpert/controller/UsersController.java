package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.service.ExpertService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/user")
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private ExpertService expertService;


    @GetMapping("/getall")
    public List<User> getAll() {
        return userService.find();
    }


    @GetMapping("/get")
    public ResponseEntity<User> getById() {
        return ResponseEntity.ok(userService.findByid());
    }
    @PostMapping("/save-address")
    public ResponseEntity<User> saveAddress(@RequestBody Address address) {
        return ResponseEntity.ok(userService.saveAddress(address));
    }

    @PutMapping("/add-expert/{expertid}")
    public ResponseEntity<User> addExpertToUser(@PathVariable UUID expertid) {
        User user = userService.findByid();
        if (user != null) {
            user.addExpert(expertid);
        }
        return ResponseEntity.ok(userService.save(user));
    }



    @PutMapping("/delete-expert/{expertid}")
    public ResponseEntity<User> deleteExpertFromUser(@PathVariable UUID expertid) {
        User user = userService.findByid();
        if (user == null) {
            throw new RuntimeException("User not found with this accestoken");
        } else {
            return ResponseEntity.ok(userService.deleteExpert(user,expertid));
        }
    }
    @PutMapping("/add-language")
    public ResponseEntity<User> setLanguage(@RequestBody String language) {
        User user = userService.findByid();
        user.setLanguage(language);
        return ResponseEntity.ok(userService.save(user));
    }
    @GetMapping("/get-language")
    public String getLanguage() {
        User user = userService.findByid();
        return user.getLanguage();
    }

    @GetMapping("/userbyelastic")
    public List<User> findUserViaElastic(@RequestParam String searchparams) {
        return userService.findBestMatchedUserByName(searchparams);
    }
    @GetMapping("/expertsbyuser")
    public List<Expert> findExpertsByUsers(@RequestParam String searchparams) {
        return userService.findExpertsByUser(searchparams);
    }


}