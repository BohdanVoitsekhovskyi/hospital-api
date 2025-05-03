package com.example.demo.dto;


import com.example.demo.models.Roles;
import lombok.Data;

@Data
public class UserDTO {

    private String email;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
    private Roles role;

}
