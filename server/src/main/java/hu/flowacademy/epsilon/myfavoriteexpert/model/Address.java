package hu.flowacademy.epsilon.myfavoriteexpert.model;

import lombok.Data;

@Data
public class Address {

    private String country;

    private String city;

    private String street;

    private String number;

    public Address() {
    }


}
