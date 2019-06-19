package hu.flowacademy.epsilon.myfavoriteexpert.model;

import lombok.Data;

@Data
public class Provider {

    private String provider_id;

    private String provider_type;

    private String email;

    private String name;

    private String profile_picture;


    public Provider() {
    }


}
