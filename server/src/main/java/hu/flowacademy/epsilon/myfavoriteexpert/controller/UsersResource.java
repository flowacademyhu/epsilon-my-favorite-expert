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
        User user = userService.saveAddress(address);
        return ResponseEntity.ok(user);
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
    @GetMapping("/user/search")
    public List<User> SearchUserWithQuery(@RequestParam String searchparams) {
        return userService.findBestMatchedUserByName(searchparams);
    }
    @GetMapping("/user/expert")
    public List<Expert> findExpertsByUsers(@RequestParam String searchparams) {
        return userService.findExpertsByUser(searchparams);
    }
    @GetMapping("user/experts/{id}")
    public List<Expert> findAllExpertOfUser(@PathVariable UUID id) {
        System.out.println(id);
        return userService.findAllExperts(id);
    }
    @GetMapping("user/expertsintersect")
    public List<Expert> findUsersExpertsUnion( @RequestParam UUID id) {
        return userService.findUsersExpertsIntersection(id);
    }
    @PutMapping("user/follow")
    public ResponseEntity<User> addFollowerToUser(@RequestParam UUID followerid) {
        User user = userService.findByid();
        User follower = userService.findFollowerByid(followerid);
        UUID userid= user.getId();
        if (user != null && follower!= null) {
            user.addFollower(followerid);
            follower.addFollowedBy(userid);
        }
        userService.save(follower);
        return ResponseEntity.ok(userService.save(user));
    }

    @DeleteMapping("user/follow")
    public ResponseEntity<User> deleteFollowerFromUser(@RequestParam UUID followerid) {
        User user = userService.findByid();
        User follower = userService.findFollowerByid(followerid);
        if (user == null && follower == null) {
            throw new RuntimeException("User or follower not found");
        } else {
            userService.deleteFollower(follower, user.getId());
            return ResponseEntity.ok(userService.deleteFollower(user,followerid));
        }
    }
}