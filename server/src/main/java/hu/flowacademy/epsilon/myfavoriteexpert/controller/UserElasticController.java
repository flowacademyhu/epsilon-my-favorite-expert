package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.service.ExpertService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.UserElasticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/auth/user")
public class UserElasticController {

    @Autowired
    private UserElasticService userElasticService;

    @Autowired
    private ExpertService expertService;


    @GetMapping("/getall")
    public ResponseEntity<List<UserElastic>> getAll() {

        return ResponseEntity.ok(userElasticService.find());
    }


    @GetMapping("/get")
    public ResponseEntity<UserElastic> getById(@RequestHeader(value = "Authorization") String accestoken) {
        if (accestoken==null) {
            throw new RuntimeException("URES A TOKEN");
        }
        System.out.println(accestoken);
        return ResponseEntity.ok(userElasticService.findByid(accestoken));
    }
    @PostMapping("/save-address")
    public ResponseEntity<UserElastic> saveAddress(@RequestHeader(value = "Authorization") String accestoken, @RequestBody Address address) {
        return ResponseEntity.ok(userElasticService.saveAddress(accestoken,address));
    }

    @PutMapping("/add-expert/{expertid}")
    public ResponseEntity<UserElastic> addExpertToUser(@RequestHeader(value = "Authorization") String accestoken, @PathVariable UUID expertid) {
        UserElastic userElastic = userElasticService.findByid(accestoken);
        if (userElastic != null) {
            userElastic.addExpert(expertid);
        }
        return ResponseEntity.ok(userElasticService.save(userElastic));
    }

    @PutMapping("/delete-expert/{expertid}")
    public ResponseEntity<UserElastic> deleteExpertFromUser(@RequestHeader(value = "Authorization") String accestoken, @PathVariable UUID expertid) {
        UserElastic user = userElasticService.findByid(accestoken);
        if (user == null) {
            throw new RuntimeException("User not found with this accestoken");
        } else {
            return ResponseEntity.ok(userElasticService.deleteExpert(user,expertid));
        }
    }
}
