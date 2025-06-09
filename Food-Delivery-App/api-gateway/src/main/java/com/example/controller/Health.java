package com.example.controller;

import com.example.dto.HealthResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class Health {
    @GetMapping("schedule-service")
    public ResponseEntity<HealthResponse> schedule() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new HealthResponse("DOWN"));
    }

    @GetMapping("airport-service")
    public ResponseEntity<HealthResponse> airport() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new HealthResponse("DOWN"));
    }

    @GetMapping("flight-service")
    public ResponseEntity<HealthResponse> flight() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new HealthResponse("DOWN"));
    }

    @GetMapping("auth-service")
    public ResponseEntity<HealthResponse> auth() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new HealthResponse("DOWN"));
    }

    @GetMapping("user-service")
    public ResponseEntity<HealthResponse> user() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new HealthResponse("DOWN"));
    }
}
