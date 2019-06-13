package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.service.UserElasticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/auth/user")
public class UserElasticController {

    @Autowired
    private UserElasticService userElasticService;


    @GetMapping("/getall")
    public ResponseEntity<List<UserElastic>> getAll() {
        return ResponseEntity.ok(userElasticService.find());
    }


    @GetMapping("/get/{accestoken}")
    public ResponseEntity<UserElastic> getById(@PathVariable String accestoken) {
        return ResponseEntity.ok(userElasticService.findByid(accestoken));
    }
    @PostMapping("/save-address/{accestoken}")
    public ResponseEntity<UserElastic> saveAddress(@PathVariable String accestoken, @RequestBody Address address) {
        return ResponseEntity.ok(userElasticService.saveAddress(accestoken,address));
    }
}
