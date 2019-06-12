package hu.flowacademy.epsilon.myfavoriteexpert.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import hu.flowacademy.epsilon.myfavoriteexpert.security.oauth2.user.OAuth2UserInfo;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.Id;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Document(indexName = "users", type = "default")
public class UserElastic {

    @Id
    private UUID id;

    private String name;

    private Address address;

    private List<UUID> followers;

    private List<UUID> followed_by;

    private List<UUID> experts;

    private Provider providers;

    private String access_token;


    private LocalDateTime created_at;


    private List<LocalDateTime> updated_at;


    private LocalDateTime expire_at;

    private LocalDateTime deleted_at;

    private boolean is_deleted;


    public UserElastic() {
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

    public List<UUID> getFollowers() {
        return followers;
    }

    public void setFollowers(List<UUID> followers) {
        this.followers = followers;
    }

    public List<UUID> getFollowed_by() {
        return followed_by;
    }

    public void setFollowed_by(List<UUID> followed_by) {
        this.followed_by = followed_by;
    }

    public List<UUID> getExperts() {
        return experts;
    }

    public void setExperts(List<UUID> experts) {
        this.experts = experts;
    }

    public Provider getProviders() {
        return providers;
    }

    public void setProviders(Provider providers) {
        this.providers = providers;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }


    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public List<LocalDateTime> getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(List<LocalDateTime> updated_at) {
        this.updated_at = updated_at;
    }

    public LocalDateTime getExpire_at() {
        return expire_at;
    }

    public void setExpire_at(LocalDateTime expire_at) {
        this.expire_at = expire_at;
    }

    public LocalDateTime getDeleted_at() {
        return deleted_at;
    }

    public void setDeleted_at(LocalDateTime deleted_at) {
        this.deleted_at = deleted_at;
    }
}
