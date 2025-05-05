package com.example.demo.services.implemantation;

import com.example.demo.dao.AppointmentRepository;
import com.example.demo.dao.DoctorsTimeSlotRepository;
import com.example.demo.dao.PatientRepository;
import com.example.demo.dto.AppointmentDTO;
import com.example.demo.entities.Appointment;
import com.example.demo.entities.Patient;
import com.example.demo.models.AppointmentStatus;
import com.example.demo.services.AppointmentService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorsTimeSlotRepository doctorsTimeSlotRepository;


    @Override
    public List<Appointment> findByPatientId(Integer patientId) {
        return appointmentRepository.findAllByPatientId(patientId);
    }

    @Override
    public List<Appointment> findByDoctorId(Integer doctorId) {
        //return appointmentRepository.(doctorId);
        return null;
    }

    @Override
    @Transactional
    public Appointment save(AppointmentDTO appointmentDTO) {
        Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with ID: " + appointmentDTO.getPatientId()));

        // Get the time slot and check if it's available
        var timeSlot = doctorsTimeSlotRepository.findById(appointmentDTO.getDoctorTimeSlotId()).orElseThrow();
        if (!timeSlot.getIsAvailable()) {
            throw new IllegalStateException("This time slot is no longer available");
        }

        // Mark the time slot as unavailable
        timeSlot.setIsAvailable(false);
        doctorsTimeSlotRepository.save(timeSlot);

        // Create and save the appointment
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setTimeslot(timeSlot);
        return appointmentRepository.save(appointment);
    }

    @Override
    @Transactional
    public Appointment cancelAppointment(Integer appointmentId) {
        // Find the appointment
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        // Check if the appointment is already canceled/rejected
        if (appointment.getStatus() == AppointmentStatus.REJECTED) {
            return appointment; // Already canceled, nothing to do
        }

        // Mark the time slot as available again
        var timeSlot = appointment.getTimeslot();
        timeSlot.setIsAvailable(true);
        doctorsTimeSlotRepository.save(timeSlot);

        // Update the appointment status
        appointment.setStatus(AppointmentStatus.REJECTED);
        return appointmentRepository.save(appointment);
    }

    @Override
    @Transactional
    public Appointment updateAppointmentStatus(Integer appointmentId, AppointmentStatus status) {
        // Find the appointment
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        // If the status is changing to REJECTED, make the time slot available again
        if (status == AppointmentStatus.REJECTED && appointment.getStatus() != AppointmentStatus.REJECTED) {
            var timeSlot = appointment.getTimeslot();
            timeSlot.setIsAvailable(true);
            doctorsTimeSlotRepository.save(timeSlot);
        }

        // Update the appointment status
        appointment.setStatus(status);
        return appointmentRepository.save(appointment);
    }
}
