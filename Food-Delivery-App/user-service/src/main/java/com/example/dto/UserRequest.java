package com.example.dto;

import com.example.enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;

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

    public UserRequest() {
    }

    public UserRequest(String email, int id, String name, Role role, String password, String address, String addressType, String phoneNumber) {
        this.email = email;
        this.id = id;
        this.name = name;
        this.role = role;
        this.password = password;
        this.address = address;
        this.addressType = addressType;
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressType() {
        return addressType;
    }

    public void setAddressType(String addressType) {
        this.addressType = addressType;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
