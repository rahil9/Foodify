package com.example.mapper;

import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import com.example.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponse mapToDTO(User user) {
        return new UserResponse(
                user.getEmail(),
                user.getId(),
                user.getName(),
                user.getRole(),
                user.getPassword(),
                user.getAddress(),
                user.getAddressType(),
                user.getPhoneNumber());
    }

    public User mapToModel(UserRequest user) {
        return new User(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getAddress(),
                user.getAddressType(),
                user.getPhoneNumber());
    }
}
