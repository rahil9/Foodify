package com.example.mapper;

import com.example.dto.OrderItemRequest;
import com.example.dto.OrderItemResponse;
import com.example.entity.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderItemMapper {

    public OrderItem mapToModel(OrderItemRequest request) {
        return OrderItem.builder()
                .menuItemId(request.getMenuItemId())
                .quantity(request.getQuantity())
                .build();
    }

    public OrderItemResponse mapToDTO(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .menuItemId(orderItem.getMenuItemId())
                .quantity(orderItem.getQuantity())
                .build();
    }
}
