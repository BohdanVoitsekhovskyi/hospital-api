package com.example.demo.controllers;

import com.example.demo.dto.MedcardDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Medcard;
import com.example.demo.entities.User;
import com.example.demo.services.MedcardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin
@RequiredArgsConstructor
public class PatientController {

    private final MedcardService medcardService;

    @PostMapping("/medcard")
    public ResponseEntity<Medcard> createMedcard(@RequestBody MedcardDTO medcardDTO) {
        return ResponseEntity.ok(medcardService.save(medcardDTO));
    }

    @GetMapping("/medcard/{id}")
    public ResponseEntity<Medcard> getMedcard(@PathVariable Integer id) {
        return ResponseEntity.ok(medcardService.findMedcardById(id));
    }

    @PutMapping("/medcard/{id}")
    public ResponseEntity<Medcard> updateMedcard(@PathVariable Integer id, @RequestBody MedcardDTO medcardDTO) {
        return ResponseEntity.ok(medcardService.updateMedcard(id, medcardDTO));
    }
}
