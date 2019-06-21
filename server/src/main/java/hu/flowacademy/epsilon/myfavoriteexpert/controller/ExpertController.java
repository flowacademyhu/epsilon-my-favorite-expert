package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.service.ExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/expert")
public class ExpertController {

    @Autowired
    private ExpertService expertService;

    @PostMapping("/add")
    public Expert addExpert(@RequestBody Expert expert) {
        return expertService.save(expert);
    }

    @GetMapping("/get/{id}")
    public Optional<Expert> getOne(@PathVariable UUID id) {
        return expertService.findById(id);
    }

    @GetMapping("/getall")
    public List<Expert> getAll() {
        return expertService.find();
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable UUID id) {
        expertService.delete(id);
    }

    @PutMapping("/add-profession/{id}")
    public void addProfession(@PathVariable UUID id, @RequestBody String profession) {
        expertService.addProfession(id, profession);
    }

    @GetMapping("/favorite")
    public List<Expert> getFavoriteExperts() {
        return expertService.getFavoriteExperts();
    }

}
