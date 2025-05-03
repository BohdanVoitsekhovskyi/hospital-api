package com.example.demo.services.implemantation;

import com.example.demo.dao.UserRepository;
import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import com.example.demo.services.UserService;
import com.example.demo.utils.mappers.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean isUserExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    @Override
    public User login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).orElseThrow();
    }

    @Override
    public User update(Integer id, EditUserDTO userDTO) {
        User userToUpdate = userRepository.findById(id).orElseThrow();
        userToUpdate = userMapper.updateUserFromDto(userDTO,userToUpdate);
        return userRepository.save(userToUpdate);
    }


}
