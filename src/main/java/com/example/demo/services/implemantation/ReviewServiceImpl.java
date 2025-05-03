package com.example.demo.services.implemantation;

import com.example.demo.controllers.ReviewController;
import com.example.demo.dao.DoctorRepository;
import com.example.demo.dao.PatientRepository;
import com.example.demo.dao.ReviewRepository;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.entities.Review;
import com.example.demo.services.ReviewService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    //private final ReviewMapper reviewMapper;

   private final DoctorRepository doctorRepository;
   private final ReviewRepository reviewRepository;
   private final PatientRepository patientRepository;

    @Override
    public Review save(ReviewDTO reviewDTO) {

      /// Change to mapstruct func
        Review review = new Review();
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());
        review.setDoctor(doctorRepository.findById(reviewDTO.getDoctorId()).orElseThrow());
        review.setPatient(patientRepository.findById(reviewDTO.getPatientId()).orElseThrow());

        return reviewRepository.save(review);
    }
}
