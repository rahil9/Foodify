package com.example.dto;

public class UserRequest {
    String email;
    int id;
    String name;
    String role;
    String password;
    String address;
    String addressType;
    String phoneNumber;

    public UserRequest() {
    }

    public UserRequest(String email, int id, String name, String role, String password, String address,
            String addressType, String phoneNumber) {
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
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
