package com.example.entity;

import com.example.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

@Getter
@Setter
@ToString
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Component
@Table(name="user")
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private String address;
    private String addressType;
    private String phoneNumber;

    @PrePersist
    public void setDefaultRole() {
        if (this.role == null) {
            this.role = Role.valueOf("User"); // Default role
        }
    }

}
