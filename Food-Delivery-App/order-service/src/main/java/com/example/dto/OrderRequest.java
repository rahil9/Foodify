package com.example.dto;

import lombok.Data;
import com.example.enums.OrderStatus;

import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private Long restaurantId;
    private Double totalPrice;
    private List<OrderItemRequest> orderItems;
}
