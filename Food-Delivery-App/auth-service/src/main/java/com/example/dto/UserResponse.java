package com.example.dto;

public class UserResponse {
        String email;
        int id;
        String name;
        String role;
        String password;

        public UserResponse() {
        }

        public UserResponse(String email, int id, String name, String role, String password) {
                this.email = email;
                this.id = id;
                this.name = name;
                this.role = role;
                this.password = password;
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
}
