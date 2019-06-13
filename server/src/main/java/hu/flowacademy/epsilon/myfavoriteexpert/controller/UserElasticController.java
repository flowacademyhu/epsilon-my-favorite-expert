package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.service.UserElasticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth/user")
public class UserElasticController {

    @Autowired
    private UserElasticService userElasticService;

    @GetMapping("/getall")
    public ResponseEntity<Iterable<UserElastic>> getAll() {
        return ResponseEntity.ok(userElasticService.find());
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<UserElastic> getById(@PathVariable String id) {
        return ResponseEntity.ok(userElasticService.findByid(id));
    }
    @PostMapping("/save-address/{id}")
    public ResponseEntity<UserElastic> saveAddress(@PathVariable String id, @RequestBody Address address) {
        return ResponseEntity.ok(userElasticService.saveAddress(id,address));
    }
}
