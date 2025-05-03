package com.example.demo.utils.mappers;


import com.example.demo.dto.EditUserDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.entities.User;
import org.mapstruct.*;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toEntity(UserDTO userDTO);

    // Метод для оновлення User з EditUserDTO
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    User updateUserFromDto(EditUserDTO dto, @MappingTarget User user);
}
