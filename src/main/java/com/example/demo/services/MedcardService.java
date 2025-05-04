package com.example.demo.services;

import com.example.demo.dto.MedcardDTO;
import com.example.demo.entities.Medcard;

public interface MedcardService {
    Medcard save(MedcardDTO medcardDTO);
    Medcard findMedcardById(Integer id);
    Medcard updateMedcard(Integer id, MedcardDTO medcardDTO);
}