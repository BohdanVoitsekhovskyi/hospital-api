package com.example.demo.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private Integer id;
    private String country;
    private String region;
    private String city;
    private String street;
    private Integer streetNumber;
}