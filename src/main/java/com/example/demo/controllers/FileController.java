package com.example.demo.controllers;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(exposedHeaders = "Content-Disposition")
public class FileController {


    @PostMapping("/import")
    public ResponseEntity<?> importData(@RequestBody MultipartFile file) {

        System.out.println(file.getOriginalFilename());
        return ResponseEntity.ok(3);
    }
}
