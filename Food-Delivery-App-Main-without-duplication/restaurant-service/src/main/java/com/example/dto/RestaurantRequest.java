package com.example.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantRequest {
    private String name;
    private BigDecimal rating;
    private String address;
    private String location;
    private String category;
    private String description;
    private BigDecimal minOrderAmount;
    private Integer deliveryTime;
    private String image;
}

