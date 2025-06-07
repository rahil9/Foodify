package com.example.dto;
import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class OrderItemResponse {
    private Long menuItemId;
    private int quantity;
}
