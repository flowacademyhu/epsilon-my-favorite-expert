package hu.flowacademy.epsilon.myfavoriteexpert.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.data.elasticsearch.annotations.Document;

import org.springframework.data.annotation.Id;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.time.Instant;
import java.util.UUID;

@Document(indexName = "expert", type = "default")
public class Expert {

    @Id
    private UUID id;

    private String name;

    private List<String> profession;

    private String phone;

    private Address address;



    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime created_at;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime deleted_at;

    public Expert() {
    }

    public void addProfession(String job) {
        if (profession == null) {
            profession = new ArrayList<>();
        } else {
            profession.add(job);
        }
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
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



    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getDeleted_at() {
        return deleted_at;
    }

    public void setDeleted_at(LocalDateTime deleted_at) {
        this.deleted_at = deleted_at;
    }
}
