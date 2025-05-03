package com.example.demo.dto;

import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Data
public class ExportDataDTO<T> {
    private String fileType;
    private List<T> data;
}
