package com.example.demo.controllers;

import com.example.demo.dto.DoctorDTO;
import com.example.demo.entities.*;
import com.example.demo.services.AppointmentService;
import com.example.demo.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
@CrossOrigin
public class DoctorController {

    private final DoctorService doctorService;
    private final AppointmentService appointmentService;

    /// TODO: Only admin could access
    @PostMapping("/create")
    public ResponseEntity<Doctor> create(@RequestBody DoctorDTO doctorDTO) {
        return ResponseEntity.ok(doctorService.save(doctorDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable Integer id) {;
        return ResponseEntity.ok(doctorService.findDoctorById(id));
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors(
            @RequestParam(required = false) Integer specializationId,
            @RequestParam(required = false) Double minRating,
            @RequestParam(required = false) Integer hospitalId,
            @RequestParam(required = false) String city) {

        if (specializationId != null || minRating != null || hospitalId != null || city != null) {
            return ResponseEntity.ok(doctorService.findDoctorsByFilters(specializationId, minRating, hospitalId, city));
        }

        return ResponseEntity.ok(doctorService.findAllDoctors());
    }

    @GetMapping("/{id}/time-slots")
    public ResponseEntity<List<DoctorsTimeSlot>> getDoctorTimeSlots(
            @PathVariable Integer id,
            @RequestParam(required = false, defaultValue = "false") Boolean available) {
        if (available) {
            return ResponseEntity.ok(doctorService.findAvailableTimeSlotsByDoctorId(id));
        }
        return ResponseEntity.ok(doctorService.findAllTimeSlotsByDoctorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Integer id) {
        doctorService.deleteDoctorById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/specializations")
    public ResponseEntity<List<Specialization>> getAllSpecializations() {
        return ResponseEntity.ok(doctorService.findAllSpecializations());
    }

    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        return ResponseEntity.ok(doctorService.findAllCitiesWithHospitals());
    }

    @GetMapping("/hospitals")
    public ResponseEntity<List<Hospital>> getHospitals(
            @RequestParam(required = false) String city) {
        if (city != null && !city.isEmpty()) {
            return ResponseEntity.ok(doctorService.findHospitalsByCity(city));
        }
        return ResponseEntity.ok(doctorService.findAllHospitals());
    }
    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<Appointment>> getAppointments(@PathVariable Integer id) {
        return ResponseEntity.ok(appointmentService.findByDoctorId(id));
    }
}
