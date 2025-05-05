package com.example.demo.dto;

import lombok.Data;

import java.util.List;

@Data
public class DoctorDTO {
    UserDTO userDTO;
    Integer specializationId;
    Integer hospitalId;
    List<DoctorTimeSlotDTO> doctorTimeSlotDTOS;
}
