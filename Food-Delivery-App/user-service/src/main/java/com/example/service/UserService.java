package com.example.service;

import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest user);
    UserResponse getUserByEmail(String emailId);
    UserResponse getUserById(int userId);
    List<UserResponse> getAllUsers();
    UserResponse updateUser(UserRequest user);
    void deleteUserById(int userId);
    void deleteAllUsers();
    UserResponse getUserProfile(String email);
}
