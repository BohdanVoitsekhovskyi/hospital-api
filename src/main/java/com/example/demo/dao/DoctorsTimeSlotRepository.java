package com.example.demo.dao;

import com.example.demo.entities.DoctorsTimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorsTimeSlotRepository extends JpaRepository<DoctorsTimeSlot, Integer> {
    
    /**
     * Find all time slots for a specific doctor
     */
    @Query("SELECT ts FROM DoctorsTimeSlot ts WHERE ts.doctor.id = :doctorId")
    List<DoctorsTimeSlot> findAllByDoctorId(@Param("doctorId") Integer doctorId);
    
    /**
     * Find available time slots for a specific doctor
     */
    @Query("SELECT ts FROM DoctorsTimeSlot ts WHERE ts.doctor.id = :doctorId AND ts.isAvailable = true")
    List<DoctorsTimeSlot> findAvailableByDoctorId(@Param("doctorId") Integer doctorId);
}