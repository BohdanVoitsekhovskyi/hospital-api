package com.example.demo.controllers;

import com.example.demo.dto.AppointmentDTO;
import com.example.demo.dto.AppointmentStatusDTO;
import com.example.demo.entities.Appointment;
import com.example.demo.models.AppointmentStatus;
import com.example.demo.services.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
@CrossOrigin
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        return ResponseEntity.ok(appointmentService.save(appointmentDTO));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserId(@PathVariable Integer userId) {
        return ResponseEntity.ok(appointmentService.findByPatientId(userId));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByDoctorId(@PathVariable Integer doctorId) {
        return ResponseEntity.ok(appointmentService.findByDoctorId(doctorId));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancelAppointment(@PathVariable Integer id) {
        return ResponseEntity.ok(appointmentService.cancelAppointment(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Appointment> updateAppointmentStatus(
            @PathVariable Integer id,
            @RequestBody AppointmentStatusDTO statusDTO) {
        return ResponseEntity.ok(appointmentService.updateAppointmentStatus(id, statusDTO.getStatus()));
    }
}
