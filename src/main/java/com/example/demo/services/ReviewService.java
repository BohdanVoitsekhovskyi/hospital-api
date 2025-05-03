package com.example.demo.services;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entities.Review;

public interface ReviewService {
    Review save(ReviewDTO reviewDTO);
}
