package hu.flowacademy.epsilon.myfavoriteexpert.utils;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Address;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.ExpertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Component
public class InitExpertLoader implements CommandLineRunner {

    @Autowired
    private ExpertRepository expertRepository;

    @Override
    public void run(String... args) throws Exception {

        InputStream input = new ClassPathResource(
                "expertloader.txt").getInputStream();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(input))) {
            reader.lines().forEach(t -> {
                String[] attr = t.split(";");
                Expert expert = new Expert();
                Address address = new Address();
                expert.setId(UUID.randomUUID());
                expert.setCreated_at(LocalDateTime.now());
                expert.setName(attr[0]);
                var list = new ArrayList<String>();
                list.add(attr[1]);
                expert.setProfession(list);
                expert.setPhone(attr[2]);
                address.setCountry(attr[3]);
                address.setCity(attr[4]);
                address.setStreet(attr[5]);
                address.setNumber(attr[6]);
                expert.setAddress(address);


                expertRepository.save(expert);
            });

        }
    }



}
