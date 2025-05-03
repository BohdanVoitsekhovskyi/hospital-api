package com.example.demo.services;

import com.example.demo.controllers.DoctorController;
import com.example.demo.dto.DoctorDTO;
import com.example.demo.entities.Doctor;


import java.util.List;

public interface DoctorService {
    Doctor save(DoctorDTO doctorDTO);
    Doctor findDoctorById(Integer id);
    void deleteDoctorById(Integer id);

}
