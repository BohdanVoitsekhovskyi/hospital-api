package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class EditUserDTO {
    private String email;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
}
