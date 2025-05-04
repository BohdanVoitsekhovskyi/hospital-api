package com.example.demo.dao;

import com.example.demo.entities.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Integer> {
    Hospital findHospitalById(Integer id);

    @Query("SELECT h FROM Hospital h WHERE h.address.city = :city")
    List<Hospital> findHospitalsByCity(@Param("city") String city);

    @Query("SELECT DISTINCT h.address.city FROM Hospital h WHERE h.address.city IS NOT NULL ORDER BY h.address.city")
    List<String> findAllCitiesWithHospitals();
}
