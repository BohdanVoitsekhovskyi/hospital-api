package com.example.demo.controllers;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        try{
           Optional<User> user =  authService.login(loginDTO);
           if(user.isPresent()){
               return ResponseEntity.ok(user.get());
           }
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User does`t exists");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error. Try again later");
        }

    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserDTO signupDTO) {
        try{
            boolean isUserSuccessfullyRegistered = authService.register(signupDTO).isPresent();
            if(isUserSuccessfullyRegistered){
                return ResponseEntity.status(HttpStatus.CREATED).body(signupDTO);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(signupDTO);
            }
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error. Try again later");
        }
    }
}
