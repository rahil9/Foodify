package com.example.controller;

import com.example.dto.*;
import com.example.entity.UserDetailsImpl;
import com.example.exception.UserAlreadyExistsException;
import com.example.feign.UserServiceCommunication;
import com.example.dto.*;
import com.example.exception.CredentialsNotValidException;
import com.example.service.JwtService;
import feign.FeignException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserServiceCommunication communicator;
    private final JwtService jwtService;

    public AuthController(AuthenticationManager authenticationManager, UserServiceCommunication communicator,
            JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.communicator = communicator;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<DTO<AuthResponse>> authenticateAndGetToken(@RequestBody AuthRequest authRequest)
            throws Exception {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));

        if (authentication.isAuthenticated()) {
            String email = authentication.getName();
            String role = authentication.getAuthorities().toArray()[0].toString();
            String name = ((UserDetailsImpl) authentication.getPrincipal()).getName();
            int id = ((UserDetailsImpl) authentication.getPrincipal()).getId();

            final String token = jwtService.generateToken(email, role);

            return ResponseEntity.ok()
                    .header("Authorization", "Bearer " + token)
                    .body(new DTO<>(true,
                            "Logged In Successfully",
                            new AuthResponse(id, name, email, role)));
        } else {
            throw new CredentialsNotValidException("Invalid user request!");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<DTO<AuthResponse>> registerAndGetToken(@RequestBody UserRequest userRequest)
            throws NoSuchAlgorithmException, InvalidKeySpecException {
        userRequest.setPassword(new BCryptPasswordEncoder().encode(userRequest.getPassword()));
        try {
            DTO<UserResponse> userResponse = communicator.createUser(userRequest);
            if (userResponse != null && userResponse.isSuccess()) {
                final String token = jwtService.generateToken(userResponse.getData().getEmail(),
                        userResponse.getData().getRole());
                return ResponseEntity.ok()
                        .header("Authorization", "Bearer " + token)
                        .body(new DTO<>(true,
                                "Registered Successfully",
                                new AuthResponse(userResponse.getData().getId(),
                                        userResponse.getData().getName(),
                                        userResponse.getData().getEmail(),
                                        userResponse.getData().getRole())));
            } else {
                return ResponseEntity.badRequest().body(null);
            }
        } catch (FeignException.Conflict ex) {
            throw new UserAlreadyExistsException("User with this email already exists");
        } catch (FeignException ex) {
            throw new RuntimeException("Error communicating with User Service", ex);
        }
    }
}