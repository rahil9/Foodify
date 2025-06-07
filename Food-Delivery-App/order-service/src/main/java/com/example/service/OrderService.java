package com.example.service;

import com.example.dto.OrderRequest;
import com.example.dto.OrderResponse;
import com.example.enums.OrderStatus;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    OrderResponse updateOrderStatus(Long orderId, OrderStatus newStatus);
    List<OrderResponse> getOrdersByUser(Long userId);
    List<OrderResponse> getOrdersByRestaurant(Long restaurantId);
    OrderResponse getOrderById(Long orderId);
}
