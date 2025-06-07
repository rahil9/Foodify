package com.example.dto;

import com.example.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String email;
    private int id;
    private String name;
    private Role role;
    private String password;
    @JsonProperty("address")
    private String address;
    @JsonProperty("addressType")
    private String addressType;
    @JsonProperty("phoneNumber")
    private String phoneNumber;
}
