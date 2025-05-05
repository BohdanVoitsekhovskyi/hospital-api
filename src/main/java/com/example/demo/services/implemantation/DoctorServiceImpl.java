package com.example.demo.services.implemantation;

import com.example.demo.dao.AddressRepository;
import com.example.demo.dao.DoctorRepository;
import com.example.demo.dao.DoctorsTimeSlotRepository;
import com.example.demo.dao.HospitalRepository;
import com.example.demo.dao.SpecializationRepository;
import com.example.demo.dto.DoctorDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.Doctor;
import com.example.demo.entities.DoctorsTimeSlot;
import com.example.demo.entities.Hospital;
import com.example.demo.entities.Specialization;
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
    private final SpecializationRepository specializationRepository;
    private final AddressRepository addressRepository;
    private final HospitalRepository hospitalRepository;
    private final DoctorsTimeSlotRepository doctorsTimeSlotRepository;
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

    @Override
    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public List<Doctor> findDoctorsByFilters(Integer specializationId, Double minRating, Integer hospitalId, String city) {
        return doctorRepository.findDoctorsByFilters(specializationId, minRating, hospitalId, city);
    }

    @Override
    public List<Specialization> findAllSpecializations() {
        return specializationRepository.findAll();
    }

    @Override
    public List<String> findAllCities() {
        return addressRepository.findAllCities();
    }

    @Override
    public List<String> findAllCitiesWithHospitals() {
        return hospitalRepository.findAllCitiesWithHospitals();
    }

    @Override
    public List<Hospital> findAllHospitals() {
        return hospitalRepository.findAll();
    }

    @Override
    public List<Hospital> findHospitalsByCity(String city) {
        return hospitalRepository.findHospitalsByCity(city);
    }

    @Override
    public List<DoctorsTimeSlot> findAllTimeSlotsByDoctorId(Integer doctorId) {
        return doctorsTimeSlotRepository.findAllByDoctorId(doctorId);
    }

    @Override
    public List<DoctorsTimeSlot> findAvailableTimeSlotsByDoctorId(Integer doctorId) {
        System.out.println(doctorsTimeSlotRepository.findAvailableByDoctorId(doctorId));
        return doctorsTimeSlotRepository.findAvailableByDoctorId(doctorId) ;
    }
}
