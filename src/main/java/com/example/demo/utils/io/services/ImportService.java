package com.example.demo.utils.io.services;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ImportService {
    List<?> importData(MultipartFile file);
}
