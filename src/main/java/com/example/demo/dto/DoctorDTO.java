package com.example.demo.dto;

import lombok.Data;

@Data
public class DoctorDTO {
    UserDTO userDTO;
    Integer specializationId;
    Integer hospitalId;
}
