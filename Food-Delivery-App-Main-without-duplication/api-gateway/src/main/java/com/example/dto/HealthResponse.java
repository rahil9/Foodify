package com.example.dto;

import lombok.*;
import org.springframework.stereotype.Component;

@Data
@Component
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HealthResponse {
    public String status;
}
