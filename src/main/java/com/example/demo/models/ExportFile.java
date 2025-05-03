package com.example.demo.models;

import lombok.*;
import org.springframework.core.io.InputStreamResource;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

@Getter
public class ExportFile {
    @Setter
    private String fileName;
    private InputStreamResource content;

    public void setContent(ByteArrayOutputStream content) {
        this.content = new InputStreamResource(new ByteArrayInputStream(content.toByteArray()));
    }
}
