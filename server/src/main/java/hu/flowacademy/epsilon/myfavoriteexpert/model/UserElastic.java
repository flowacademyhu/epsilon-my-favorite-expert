package hu.flowacademy.epsilon.myfavoriteexpert.model;

import hu.flowacademy.epsilon.myfavoriteexpert.security.oauth2.user.OAuth2UserInfo;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.Id;
import java.time.Instant;
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

    private List<OAuth2UserInfo> providers;

    private String access_token;

    private Instant created_at;

    private List<Instant> updated_at;

    private Instant expire_at;

    private Instant deleted_at;

    private boolean is_deleted;

    public Instant getExpire_at() {
        return expire_at;
    }

    public void setExpire_at(Instant expire_at) {
        this.expire_at = expire_at;
    }

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

    public List<OAuth2UserInfo> getProviders() {
        return providers;
    }

    public void setProviders(OAuth2UserInfo providers) {
        if (this.providers == null) {
            this.providers = new ArrayList<OAuth2UserInfo>();
        }
        this.providers.add(providers);
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String access_token) {
        this.access_token = access_token;
    }

    public Instant getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Instant created_at) {
        this.created_at = created_at;
    }

    public List<Instant> getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(List<Instant> updated_at) {
        this.updated_at = updated_at;
    }

    public Instant getDeleted_at() {
        return deleted_at;
    }

    public void setDeleted_at(Instant deleted_at) {
        this.deleted_at = deleted_at;
    }

    public boolean isIs_deleted() {
        return is_deleted;
    }

    public void setIs_deleted(boolean is_deleted) {
        this.is_deleted = is_deleted;
    }
}
