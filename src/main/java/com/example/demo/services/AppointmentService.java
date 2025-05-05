package com.example.demo.services;

import com.example.demo.dto.AppointmentDTO;
import com.example.demo.entities.Appointment;
import com.example.demo.models.AppointmentStatus;

import java.util.List;

public interface AppointmentService {
    List<Appointment> findByPatientId(Integer patientId);
    List<Appointment> findByDoctorId(Integer doctorId);
    Appointment save(AppointmentDTO appointmentDTO);
    Appointment cancelAppointment(Integer appointmentId);
    Appointment updateAppointmentStatus(Integer appointmentId, AppointmentStatus status);
}
