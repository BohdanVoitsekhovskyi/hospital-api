package com.example.demo.dto;

import com.example.demo.models.Gender;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MedcardDTO {
    private Integer id;
    private AddressDTO address;
    private LocalDate bithday;
    private Gender gender;
}
