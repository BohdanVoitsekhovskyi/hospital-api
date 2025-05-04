package com.example.demo.dao;

import com.example.demo.entities.Medcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedcardRepository extends JpaRepository<Medcard, Integer> {
    Medcard findMedcardById(Integer id);
}