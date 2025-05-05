package com.example.demo.dto;

import com.example.demo.entities.DoctorsTimeSlot;
import lombok.Data;

@Data
public class AppointmentDTO {
    private Integer patientId;
    private Integer doctorTimeSlotId;
}
