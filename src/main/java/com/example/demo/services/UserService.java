package com.example.demo.services;

import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.models.Roles;

import java.util.Optional;

public interface UserService {
    User save(User User);
    boolean isUserExist(String email);
    User login(String email, String password);
    User update(Integer id, EditUserDTO userDTO);
}
