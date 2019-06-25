package hu.flowacademy.epsilon.myfavoriteexpert.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hu.flowacademy.epsilon.myfavoriteexpert.serializer.LocalDateTimeDeserializer;
import hu.flowacademy.epsilon.myfavoriteexpert.serializer.LocalDateTimeSerializer;
import hu.flowacademy.epsilon.myfavoriteexpert.service.geocoding.Location;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@Document(indexName = "user_index", type = "default")
public class User {
    @Id
    private UUID id;

    private String name;

    private String email;

    private String imageUrl;

    private Boolean emailVerified = false;

    private String password;

    private AuthProvider provider;

    private String accessToken;

    private Address address;

    private Provider providers;

    private List<UUID> followers= new ArrayList<>();

    private List<UUID> followed_by= new ArrayList<>();

    private List<UUID> experts = new ArrayList<>();

    private  String language;

    private Location locationByAddress;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime updatedAt;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime deletedAt;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime expiresAt;

    private String providerId;

    public void addExpert(UUID expertid) {
            experts.add(expertid);
    }
    public void deleteExpert(UUID expertid) {
        if (experts.contains(expertid)) {
            experts.remove(expertid);
        }
    }
    public void addFollower(UUID followerid) {
        if (!followers.contains(followerid)) {
            followers.add(followerid);
        }
    }
    public void deleteFollower(UUID followerid) {
        if (followers.contains(followerid)) {
            followers.remove(followerid);
        }
    }
    public void addFollowedBy(UUID followerid) {
        if (!followed_by.contains(followerid)) {
            followed_by.add(followerid);
        }
    }
    public void deleteFollowedBy(UUID followerid) {
        if (followed_by.contains(followerid)) {
            followed_by.remove(followerid);
        }
    }
}
