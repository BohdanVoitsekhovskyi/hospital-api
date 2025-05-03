package com.example.demo.services.implemantation;

import com.example.demo.dao.DoctorRepository;

import com.example.demo.dto.DoctorDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.services.AuthService;
import com.example.demo.services.DoctorService;
import com.example.demo.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final AuthService authService;

    @Transactional
    @Override
    public Doctor save(DoctorDTO doctorDTO) {
        UserDTO updateUserDTO = doctorDTO.getUserDTO();
        authService.register(updateUserDTO);

        return null;
    }

    @Override
    public Doctor findDoctorById(Integer id) {
        return doctorRepository.findDoctorById(id);
    }

    @Override
    public void deleteDoctorById(Integer id) {
         doctorRepository.deleteById(id);
    }


}
