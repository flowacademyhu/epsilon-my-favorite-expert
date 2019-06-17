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
@RequestMapping(path = "/auth/user")
public class UsersController {

    @Autowired
    private UserService userService;

    @Autowired
    private ExpertService expertService;


    @GetMapping("/getall")
    public ResponseEntity<List<User>> getAll() {

        return ResponseEntity.ok(userService.find());
    }


    @GetMapping("/get")
    public ResponseEntity<User> getById(@RequestHeader(value = "Authorization") String accestoken) {
        if (accestoken==null) {
            throw new RuntimeException("URES A TOKEN");
        }
        System.out.println(accestoken);
        return ResponseEntity.ok(userService.findByid(accestoken));
    }
    @PostMapping("/save-address")
    public ResponseEntity<User> saveAddress(@RequestHeader(value = "Authorization") String accestoken, @RequestBody Address address) {
        return ResponseEntity.ok(userService.saveAddress(accestoken,address));
    }

    @PutMapping("/add-expert/{expertid}")
    public ResponseEntity<User> addExpertToUser(@RequestHeader(value = "Authorization") String accestoken, @PathVariable UUID expertid) {
        User user = userService.findByid(accestoken);
        if (user != null) {
            user.addExpert(expertid);
        }
        return ResponseEntity.ok(userService.save(user));
    }

    @PutMapping("/delete-expert/{expertid}")
    public ResponseEntity<User> deleteExpertFromUser(@RequestHeader(value = "Authorization") String accestoken, @PathVariable UUID expertid) {
        User user = userService.findByid(accestoken);
        if (user == null) {
            throw new RuntimeException("User not found with this accestoken");
        } else {
            return ResponseEntity.ok(userService.deleteExpert(user,expertid));
        }
    }
}