package com.example.demo.controllers;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entities.Review;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/review")
public class ReviewController {

    @PostMapping("/add")
    public ResponseEntity<Review> addReview(@RequestBody ReviewDTO reviewDTO) {
        return null;
    }
}
