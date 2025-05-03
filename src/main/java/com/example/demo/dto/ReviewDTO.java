package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class ReviewDTO {
    private Integer patientId;
    private Integer doctorId;
    private String content;
    private Integer rating;
}
