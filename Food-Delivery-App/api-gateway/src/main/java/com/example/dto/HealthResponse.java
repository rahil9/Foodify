//package com.example.dto;
//
//import lombok.*;
//import org.springframework.stereotype.Component;
//
//@Data
//@Component
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class HealthResponse {
//    public String status;
//}
package com.example.dto;

public class HealthResponse {
    public String status;

    public HealthResponse(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "HealthResponse{" +
                "status='" + status + '\'' +
                '}';
    }
}