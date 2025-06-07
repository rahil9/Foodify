package com.example.mapper;

import com.example.dto.OrderRequest;
import com.example.dto.OrderResponse;
import com.example.entity.Order;
import com.example.enums.OrderStatus;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public Order mapToModel(OrderRequest request) {
        return Order.builder()
                .userId(request.getUserId())
                .restaurantId(request.getRestaurantId())
                .totalPrice(request.getTotalPrice())
                .orderItems(request.getOrderItems().stream()
                        .map(new OrderItemMapper()::mapToModel)
                        .collect(Collectors.toList()))
                .build();
    }

    public OrderResponse toResponse(Order order) {
        return OrderResponse.builder()
                .orderId(order.getId())
                .userId(order.getUserId())
                .restaurantId(order.getRestaurantId())
                .totalPrice(order.getTotalPrice())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .orderItems(order.getOrderItems().stream()
                        .map(new OrderItemMapper()::mapToDTO)
                        .collect(Collectors.toList()))
                .build();
    }
}
