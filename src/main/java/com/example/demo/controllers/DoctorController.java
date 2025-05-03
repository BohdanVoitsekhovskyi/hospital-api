package com.example.demo.controllers;

import com.example.demo.dto.DoctorDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.User;
import com.example.demo.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    /// TODO: Only admin could access
    @PostMapping("/create")
    public ResponseEntity<Doctor> create(DoctorDTO doctorDTO) {
        return ResponseEntity.ok(doctorService.save(doctorDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable Integer id) {
        return ResponseEntity.ok(doctorService.findDoctorById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Integer id) {
        doctorService.deleteDoctorById(id);
        return ResponseEntity.noContent().build();
    }

}
