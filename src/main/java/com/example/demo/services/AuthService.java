package com.example.demo.services;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;

import java.util.Optional;

public interface AuthService {
    Optional<User> register(UserDTO signupDTO);
    Optional<User> login(LoginDTO loginDTO);
}
