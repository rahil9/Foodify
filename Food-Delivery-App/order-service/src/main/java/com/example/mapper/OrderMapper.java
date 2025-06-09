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
                Order order = new Order();
                order.setUserId(request.getUserId());
                order.setRestaurantId(request.getRestaurantId());
                order.setTotalPrice(request.getTotalPrice());
                order.setOrderItems(request.getOrderItems().stream()
                                .map(new OrderItemMapper()::mapToModel)
                                .collect(Collectors.toList()));
                return order;
        }

        public OrderResponse toResponse(Order order) {
                return new OrderResponse(
                                order.getId(),
                                order.getUserId(),
                                order.getRestaurantId(),
                                order.getTotalPrice(),
                                order.getStatus(),
                                order.getCreatedAt(),
                                order.getOrderItems().stream()
                                                .map(new OrderItemMapper()::mapToDTO)
                                                .collect(Collectors.toList()));
        }
}
