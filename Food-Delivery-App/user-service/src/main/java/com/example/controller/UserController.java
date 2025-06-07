package com.example.controller;

import com.example.dto.DTO;
import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import com.example.service.UserService;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;

    @GetMapping("/user/email/{email}")
    public ResponseEntity<DTO<UserResponse>> getUserByEmail(@PathVariable String email){
        UserResponse user = service.getUserByEmail(email);
        return ResponseEntity.ok(DTO.<UserResponse>builder()
                .success(true)
                .message("User found !")
                .data(user)
                .build());
    }

    @GetMapping("/users")
    public ResponseEntity<DTO<List<UserResponse>>> getAllUsers() {
        List<UserResponse> users = service.getAllUsers();
        return ResponseEntity.ok(DTO.<List<UserResponse>>builder()
                .success(true)
                .message("Users Fetched Successfully")
                .data(users)
                .build());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<DTO<UserResponse>> getUserById(@PathVariable int id){
        UserResponse user = service.getUserById(id);
        return  ResponseEntity.ok(DTO.<UserResponse>builder()
                .success(true)
                .message("User Fetched Successfully")
                .data(user)
                .build());
    }

    @PostMapping("/user")
    public ResponseEntity<DTO<UserResponse>> createUser(@RequestBody UserRequest user) {
        System.out.println(user);
        UserResponse createdUser = service.createUser(user);
        return ResponseEntity.status(201).body(DTO.<UserResponse>builder()
                .success(true)
                .message("User Created Successfully !")
                .data(createdUser)
                .build());
    }

//    @GetMapping("/user/profile")
//    public ResponseEntity<DTO<UserResponse>> getUserProfile(@RequestBody Map<String, String> request) {
//        String email = request.get("email");
//
//        UserResponse user = service.getUserProfile(email);
//        return ResponseEntity.ok(DTO.<UserResponse>builder()
//                .success(true)
//                .message("User Profile Fetched Successfully")
//                .data(user)
//                .build());
//    }

    @PostMapping("/user/profile")
    public ResponseEntity<DTO<UserResponse>> getUserProfile(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        UserResponse user = service.getUserProfile(email);
        return ResponseEntity.ok(DTO.<UserResponse>builder()
                .success(true)
                .message("User Profile Fetched Successfully")
                .data(user)
                .build());
    }

    @PutMapping("/user")
    public ResponseEntity<DTO<UserResponse>> updateUser(@RequestBody UserRequest user){
        UserResponse updateUser = service.updateUser(user);
        return ResponseEntity.status(201).body(DTO.<UserResponse>builder()
                .success(true)
                .message("User Created Successfully !")
                .data(updateUser)
                .build());
    }

    @DeleteMapping("/user/{id}")
    private ResponseEntity<DTO<String>> deleteUserById(@PathVariable int id){
        service.deleteUserById(id);
        return ResponseEntity.ok(DTO.<String>builder()
                .success(true)
                .message("User Deleted Successfully")
                .data(null)
                .build());
    }

    @DeleteMapping("/users")
    private ResponseEntity<DTO<String>> deleteAllUsers(){
        service.deleteAllUsers();
        return ResponseEntity.ok(DTO.<String>builder()
                .success(true)
                .message("All Users Deleted Successfully")
                .data(null)
                .build());
    }
}
