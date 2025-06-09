package com.example.mapper;

import com.example.dto.OrderItemRequest;
import com.example.dto.OrderItemResponse;
import com.example.entity.OrderItem;
import org.springframework.stereotype.Component;

@Component
public class OrderItemMapper {

    public OrderItem mapToModel(OrderItemRequest request) {
        OrderItem orderItem = new OrderItem();
        orderItem.setMenuItemId(request.getMenuItemId());
        orderItem.setQuantity(request.getQuantity());
        return orderItem;
    }

    public OrderItemResponse mapToDTO(OrderItem orderItem) {
        return new OrderItemResponse(
                orderItem.getMenuItemId(),
                orderItem.getQuantity());
    }
}
