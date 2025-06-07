package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class MenuItemResponse {
    private Long id;
    private String name;
    private BigDecimal price;
    private String description;
    private String category;
    private Long restaurantId;

    @JsonProperty("isVeg")
    private boolean isVeg;

    private String image;
}
