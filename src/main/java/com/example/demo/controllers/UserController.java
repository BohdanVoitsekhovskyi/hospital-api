package com.example.demo.controllers;


import com.example.demo.dao.UserRepository;
import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.ExportDataDTO;
import com.example.demo.entities.User;
import com.example.demo.utils.io.ExportServiceFactory;
import com.example.demo.utils.io.services.ExportService;
import com.example.demo.models.ExportFile;
import com.example.demo.services.UserService;
import com.opencsv.exceptions.CsvDataTypeMismatchException;
import com.opencsv.exceptions.CsvRequiredFieldEmptyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final ExportServiceFactory exportServiceFactory;
    private final UserRepository userRepository;
    private final UserService userService;

    @Autowired
    public UserController(ExportServiceFactory exportServiceFactory, UserRepository userRepository, UserService userService) {
        this.exportServiceFactory = exportServiceFactory;
        this.userRepository = userRepository;
        this.userService = userService;
    }
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Integer id) {
        Optional<User> user = userRepository.findById(id);
        return new ResponseEntity<>(user.get(), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping("/{id}/edit")
    public ResponseEntity<User> editUser(@PathVariable Integer id, @RequestBody EditUserDTO user) {
        return new ResponseEntity<>(userService.update(id, user), HttpStatus.OK);
    }

    @CrossOrigin(exposedHeaders = "Content-Disposition")
    @RequestMapping("/export")
    public ResponseEntity<Resource> export(@RequestBody ExportDataDTO<User> exportDataDTO) throws CsvRequiredFieldEmptyException, CsvDataTypeMismatchException, IOException {
        ExportService exportManager = exportServiceFactory.getService(exportDataDTO.getFileType());
        ExportFile exportFile = exportManager.exportData(exportDataDTO.getData());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDisposition(
                ContentDisposition.builder("attachment")
                        .filename(exportFile.getFileName())
                        .build());


        return ResponseEntity.ok()
                .headers(headers)
                .body(exportFile.getContent());

    }
}
