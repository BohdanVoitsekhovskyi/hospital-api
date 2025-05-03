package com.example.demo.services.implemantation;

import com.example.demo.dao.UserRepository;
import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.models.Roles;
import com.example.demo.services.AuthService;
import com.example.demo.services.UserService;
import com.example.demo.utils.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final UserMapper userMapper;

    @Override
    public Optional<User> register(UserDTO userDTO) {
        boolean isUserExist = userService.isUserExist(userDTO.getEmail());
        if (isUserExist) {
            return Optional.empty();
        } else {
            User user = userMapper.toEntity(userDTO);
            user.setCreatedAt(LocalDateTime.now());

           return  Optional.of(userService.save(user)) ;
        }
    }

    @Override
    public Optional<User> login(LoginDTO loginDTO) {
        return Optional.of(userService.login(loginDTO.getEmail(), loginDTO.getPassword()));
    }
}
