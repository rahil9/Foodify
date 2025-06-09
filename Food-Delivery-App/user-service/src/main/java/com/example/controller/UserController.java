package com.example.controller;

import com.example.dto.DTO;
import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import com.example.service.UserService;
import jakarta.annotation.security.PermitAll;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/user/email/{email}")
    public ResponseEntity<DTO<UserResponse>> getUserByEmail(@PathVariable String email) {
        UserResponse user = service.getUserByEmail(email);
        return ResponseEntity.ok(new DTO<>(true,
                "User found !",
                user));
    }

    @GetMapping("/users")
    public ResponseEntity<DTO<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = service.getAllUsers();
        return ResponseEntity.ok(new DTO<>(true,
                "Users Fetched Successfully",
                users));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<DTO<UserResponse>> getUserById(@PathVariable int id) {
        UserResponse user = service.getUserById(id);
        return ResponseEntity.ok(new DTO<>(true,
                "User Fetched Successfully",
                user));
    }

    @PostMapping("/user")
    public ResponseEntity<DTO<UserResponse>> createUser(@RequestBody UserRequest user) {
        System.out.println(user);
        UserResponse createdUser = service.createUser(user);
        return ResponseEntity.status(201).body(new DTO<>(true,
                "User Created Successfully !",
                createdUser));
    }

    // @GetMapping("/user/profile")
    // public ResponseEntity<DTO<UserResponse>> getUserProfile(@RequestBody
    // Map<String, String> request) {
    // String email = request.get("email");
    //
    // UserResponse user = service.getUserProfile(email);
    // return ResponseEntity.ok(new DTO<>(true,
    // "User Profile Fetched Successfully",
    // user));
    // }

    @PostMapping("/user/profile")
    public ResponseEntity<DTO<UserResponse>> getUserProfile(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        UserResponse user = service.getUserProfile(email);
        return ResponseEntity.ok(new DTO<>(true,
                "User Profile Fetched Successfully",
                user));
    }

    @PutMapping("/user")
    public ResponseEntity<DTO<UserResponse>> updateUser(@RequestBody UserRequest user) {
        UserResponse updateUser = service.updateUser(user);
        return ResponseEntity.status(201).body(new DTO<>(true,
                "User Created Successfully !",
                updateUser));
    }

    @DeleteMapping("/user/{id}")
    private ResponseEntity<DTO<String>> deleteUserById(@PathVariable int id) {
        service.deleteUserById(id);
        return ResponseEntity.ok(new DTO<>(true,
                "User Deleted Successfully",
                null));
    }

    @DeleteMapping("/users")
    private ResponseEntity<DTO<String>> deleteAllUsers() {
        service.deleteAllUsers();
        return ResponseEntity.ok(new DTO<>(true,
                "All Users Deleted Successfully",
                null));
    }
}
