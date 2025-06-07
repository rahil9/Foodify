package com.example.dto;

import com.example.enums.OrderStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Long orderId;
    private Long userId;
    private Long restaurantId;
    private Double totalPrice;
    private OrderStatus status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> orderItems;
}
