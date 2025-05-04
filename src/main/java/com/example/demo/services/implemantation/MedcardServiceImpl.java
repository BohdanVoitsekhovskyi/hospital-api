package com.example.demo.services.implemantation;

import com.example.demo.dao.MedcardRepository;
import com.example.demo.dao.AddressRepository;
import com.example.demo.dto.MedcardDTO;
import com.example.demo.entities.Medcard;
import com.example.demo.entities.Address;
import com.example.demo.services.MedcardService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedcardServiceImpl implements MedcardService {

    private final MedcardRepository medcardRepository;
    private final AddressRepository addressRepository;

    @Transactional
    @Override
    public Medcard save(MedcardDTO medcardDTO) {
        Medcard medcard = new Medcard();

        if (medcardDTO.getAddress() != null) {
            // Create a new address from the DTO
            Address address = new Address();
            address.setCountry(medcardDTO.getAddress().getCountry());
            address.setRegion(medcardDTO.getAddress().getRegion());
            address.setCity(medcardDTO.getAddress().getCity());
            address.setStreet(medcardDTO.getAddress().getStreet());
            address.setStreetNumber(medcardDTO.getAddress().getStreetNumber());

            // Save the address first to get an ID
            address = addressRepository.save(address);

            // Set the address on the medcard
            medcard.setAddress(address);
        }

        medcard.setBithday(medcardDTO.getBithday());
        medcard.setGender(medcardDTO.getGender());

        return medcardRepository.save(medcard);
    }

    @Override
    public Medcard findMedcardById(Integer id) {
        return medcardRepository.findMedcardById(id);
    }

    @Transactional
    @Override
    public Medcard updateMedcard(Integer id, MedcardDTO medcardDTO) {
        Medcard medcard = medcardRepository.findMedcardById(id);
        if (medcard == null) {
            throw new RuntimeException("Medcard not found");
        }

        if (medcardDTO.getAddress() != null) {
            // If the medcard already has an address, update it
            if (medcard.getAddress() != null) {
                Address existingAddress = medcard.getAddress();
                existingAddress.setCountry(medcardDTO.getAddress().getCountry());
                existingAddress.setRegion(medcardDTO.getAddress().getRegion());
                existingAddress.setCity(medcardDTO.getAddress().getCity());
                existingAddress.setStreet(medcardDTO.getAddress().getStreet());
                existingAddress.setStreetNumber(medcardDTO.getAddress().getStreetNumber());

                // Save the updated address
                addressRepository.save(existingAddress);
            } else {
                // Create a new address from the DTO
                Address address = new Address();
                address.setCountry(medcardDTO.getAddress().getCountry());
                address.setRegion(medcardDTO.getAddress().getRegion());
                address.setCity(medcardDTO.getAddress().getCity());
                address.setStreet(medcardDTO.getAddress().getStreet());
                address.setStreetNumber(medcardDTO.getAddress().getStreetNumber());

                // Save the address first to get an ID
                address = addressRepository.save(address);

                // Set the address on the medcard
                medcard.setAddress(address);
            }
        }

        medcard.setBithday(medcardDTO.getBithday());
        medcard.setGender(medcardDTO.getGender());

        return medcardRepository.save(medcard);
    }
}
