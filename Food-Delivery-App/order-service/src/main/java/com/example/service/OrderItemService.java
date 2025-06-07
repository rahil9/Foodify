package com.example.service;

import com.example.dto.OrderItemRequest;
import com.example.dto.OrderItemResponse;
import com.example.entity.Order;
import com.example.entity.OrderItem;

import java.util.List;

public interface OrderItemService {
    List<OrderItem> saveOrderItems(List<OrderItemRequest> orderItemRequests, Order order);
    List<OrderItemResponse> getOrderItemsByOrderId(Long orderId);
    OrderItemResponse updateOrderItemQuantity(Long orderItemId, int quantity);
    void deleteOrderItem(Long orderItemId);
}
