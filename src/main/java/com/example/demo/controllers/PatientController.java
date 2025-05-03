package com.example.demo.controllers;

import com.example.demo.entities.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class PatientController {

    // This is a placeholder implementation for demonstration purposes
    // In a real application, this would use services to interact with the database

    // Dummy data for appointments
    private static final List<Map<String, Object>> appointments = new ArrayList<>();

    static {
        // Add some dummy appointments
        Map<String, Object> appointment1 = new HashMap<>();
        appointment1.put("id", 1);
        appointment1.put("doctorName", "Dr. John Smith");
        appointment1.put("specialization", "Cardiology");
        appointment1.put("date", "2023-06-15");
        appointment1.put("time", "10:00");
        appointment1.put("status", "COMPLETED");
        appointment1.put("reason", "Annual checkup");
        appointment1.put("patientId", 1);

        Map<String, Object> appointment2 = new HashMap<>();
        appointment2.put("id", 2);
        appointment2.put("doctorName", "Dr. Sarah Johnson");
        appointment2.put("specialization", "Neurology");
        appointment2.put("date", "2023-07-20");
        appointment2.put("time", "14:30");
        appointment2.put("status", "UPCOMING");
        appointment2.put("reason", "Headache consultation");
        appointment2.put("patientId", 1);

        Map<String, Object> appointment3 = new HashMap<>();
        appointment3.put("id", 3);
        appointment3.put("doctorName", "Dr. Michael Brown");
        appointment3.put("specialization", "Pediatrics");
        appointment3.put("date", "2023-08-05");
        appointment3.put("time", "09:15");
        appointment3.put("status", "UPCOMING");
        appointment3.put("reason", "Fever and cough");
        appointment3.put("patientId", 1);

        appointments.add(appointment1);
        appointments.add(appointment2);
        appointments.add(appointment3);
    }

    // Get all appointments for a patient
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Map<String, Object>>> getAppointmentsForUser(@PathVariable Integer userId) {
        List<Map<String, Object>> userAppointments = new ArrayList<>();

        for (Map<String, Object> appointment : appointments) {
            if (appointment.get("patientId").equals(userId)) {
                userAppointments.add(appointment);
            }
        }

        return ResponseEntity.ok(userAppointments);
    }

    // Create a new appointment
    @PostMapping
    public ResponseEntity<Map<String, Object>> createAppointment(@RequestBody Map<String, Object> appointmentData) {
        // Generate a new ID (in a real app, this would be handled by the database)
        int newId = appointments.size() + 1;

        // Create the new appointment
        Map<String, Object> newAppointment = new HashMap<>(appointmentData);
        newAppointment.put("id", newId);
        newAppointment.put("status", "UPCOMING");

        // Add to the list
        appointments.add(newAppointment);

        return ResponseEntity.ok(newAppointment);
    }

    // Cancel an appointment
    @PutMapping("/{id}/cancel")
    public ResponseEntity<Map<String, Object>> cancelAppointment(@PathVariable Integer id) {
        for (Map<String, Object> appointment : appointments) {
            if (appointment.get("id").equals(id)) {
                appointment.put("status", "CANCELLED");
                return ResponseEntity.ok(appointment);
            }
        }

        return ResponseEntity.notFound().build();
    }

    // Get available doctors (in a real app, this would be in a DoctorController)
    @GetMapping("/doctors")
    public ResponseEntity<List<Map<String, Object>>> getDoctors() {
        List<Map<String, Object>> doctors = new ArrayList<>();

        Map<String, Object> doctor1 = new HashMap<>();
        doctor1.put("id", 1);
        doctor1.put("name", "Dr. John Smith");
        doctor1.put("specialization", "Cardiology");

        Map<String, Object> doctor2 = new HashMap<>();
        doctor2.put("id", 2);
        doctor2.put("name", "Dr. Sarah Johnson");
        doctor2.put("specialization", "Neurology");

        Map<String, Object> doctor3 = new HashMap<>();
        doctor3.put("id", 3);
        doctor3.put("name", "Dr. Michael Brown");
        doctor3.put("specialization", "Pediatrics");

        doctors.add(doctor1);
        doctors.add(doctor2);
        doctors.add(doctor3);

        return ResponseEntity.ok(doctors);
    }
}
