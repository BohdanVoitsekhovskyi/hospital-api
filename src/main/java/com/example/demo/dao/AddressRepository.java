package com.example.demo.dao;

import com.example.demo.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Address findAddressById(Integer id);

    @Query("SELECT DISTINCT a.city FROM Address a ORDER BY a.city")
    List<String> findAllCities();
}
