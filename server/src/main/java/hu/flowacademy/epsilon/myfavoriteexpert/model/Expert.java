package hu.flowacademy.epsilon.myfavoriteexpert.model;


import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.Id;
import java.util.List;
import java.time.Instant;
import java.util.UUID;

@Document(indexName = "expert", type = "default")
public class Expert {

    @Id
    private UUID id;

    private String name;

    private List<String> profession;

    private Address address;

    private String number;

    private Instant created_at;

    private boolean is_deleted;

    public Expert() {
    }

    public List<String> getProfession() {
        return profession;
    }

    public void setProfession(List<String> profession) {
        this.profession = profession;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Instant getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Instant created_at) {
        this.created_at = created_at;
    }

    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }
}
