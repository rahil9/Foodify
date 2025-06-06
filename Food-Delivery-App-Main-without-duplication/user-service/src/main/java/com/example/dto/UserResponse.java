package com.example.dto;

import com.example.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String email;
    private int id;
    private String name;
    private Role role;
    private String password;
    private String address;
    private String addressType;
    private String phoneNumber;
}
