package com.example.demo.dao;

import com.example.demo.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository  extends JpaRepository<Appointment, Integer> {
   List<Appointment> findAllByPatientId(Integer patientId);
   //List<Appointment> findAllByDoctorId(Integer doctorId);


}
