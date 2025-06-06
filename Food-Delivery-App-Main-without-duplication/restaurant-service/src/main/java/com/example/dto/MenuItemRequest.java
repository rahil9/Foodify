package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class MenuItemRequest {
    private String name;
    private BigDecimal price;
    private String description;
    private String category;
    private Long restaurantId;

    @JsonProperty("isVeg")
    private boolean isVeg;

    private String image;
}
