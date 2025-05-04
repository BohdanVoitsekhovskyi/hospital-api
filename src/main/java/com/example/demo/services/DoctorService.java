package com.example.demo.services;

import com.example.demo.controllers.DoctorController;
import com.example.demo.dto.DoctorDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.Hospital;
import com.example.demo.entities.Specialization;

import java.util.List;

public interface DoctorService {
    Doctor save(DoctorDTO doctorDTO);
    Doctor findDoctorById(Integer id);
    void deleteDoctorById(Integer id);
    List<Doctor> findAllDoctors();
    List<Doctor> findDoctorsByFilters(Integer specializationId, Double minRating, Integer hospitalId, String city);

    // Methods for filter data
    List<Specialization> findAllSpecializations();
    List<String> findAllCities();
    List<String> findAllCitiesWithHospitals();
    List<Hospital> findAllHospitals();
    List<Hospital> findHospitalsByCity(String city);
}
