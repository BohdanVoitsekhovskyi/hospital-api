package com.example.demo.dao;

import com.example.demo.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Doctor findDoctorById(Integer id);

    @Query("SELECT d FROM Doctor d WHERE " +
           "(:specializationId IS NULL OR d.specialization.id = :specializationId) AND " +
           "(:minRating IS NULL OR d.rating >= :minRating) AND " +
           "(:hospitalId IS NULL OR d.hospital.id = :hospitalId) AND " +
           "(:city IS NULL OR d.hospital.address.city = :city)")
    List<Doctor> findDoctorsByFilters(
            @Param("specializationId") Integer specializationId,
            @Param("minRating") Double minRating,
            @Param("hospitalId") Integer hospitalId,
            @Param("city") String city);
}
