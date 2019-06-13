package hu.flowacademy.epsilon.myfavoriteexpert.controller;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.service.ExpertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/auth")
public class ExpertController {

    @Autowired
    private ExpertService expertService;

    @PostMapping(path = "/expert/add")
    public void addExpert(@RequestBody Expert expert) {
        expertService.save(expert);
    }

    @GetMapping("/expert/get")
    public Optional<Expert> findOneItem(@RequestHeader(value = "Authorization") UUID id) {
        return expertService.findById(id);
    }

    @GetMapping("expert/list")
    public ResponseEntity<Iterable<Expert>> listTodoItems() {
        return ResponseEntity.ok(expertService.list());
    }

    @DeleteMapping("/expert/delete/{id}")
    public void delete(@PathVariable UUID id) {
        //TODO kitorolni a userektol akinel van ilyen ID
        expertService.delete(id);
    }

    @PutMapping("/expert/add-profession/{id}")
    public void addProfession(@PathVariable UUID id, @RequestBody String profession) {
        expertService.addProfession(id, profession);
    }

    @GetMapping("favorite")
    public List<Expert> getFavoriteExperts(@RequestHeader(value = "Authorization") String accestoken) {
        return expertService.getFavoriteExperts(accestoken);
    }
}

