package com.example.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantResponse {
    private Long id;
    private String name;
    private String category;
    private String address;
    private String location;
    private BigDecimal rating;
    private String description;
    private BigDecimal minOrderAmount;
    private Integer deliveryTime;
    private String image;
}
