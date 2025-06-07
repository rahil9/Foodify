package com.example.mapper;

import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import com.example.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class UserMapper {
    public UserResponse mapToDTO(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .password(user.getPassword())
                .address(user.getAddress())
                .addressType(user.getAddressType())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    public User mapToModel(UserRequest user) {
        return User.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .password(user.getPassword())
                .address(user.getAddress())
                .addressType(user.getAddressType())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
}
