package com.example.service;

import com.example.dto.OrderRequest;
import com.example.dto.OrderResponse;
import com.example.entity.Order;
import com.example.entity.OrderItem;
import com.example.enums.OrderStatus;
import com.example.mapper.OrderMapper;
import com.example.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest request) {
        Order order = orderMapper.mapToModel(request);
        order.setStatus(OrderStatus.PLACED);
        order.setCreatedAt(LocalDateTime.now());

        for(OrderItem orderItem: order.getOrderItems()) {
            orderItem.setOrder(order);
        }

        return orderMapper.toResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        validateStatusTransition(order.getStatus(), newStatus);
        
        order.setStatus(newStatus);
        return orderMapper.toResponse(orderRepository.save(order));
    }

    private void validateStatusTransition(OrderStatus currentStatus, OrderStatus newStatus) {
        switch (currentStatus) {
            case PLACED:
                if (newStatus != OrderStatus.CONFIRMED) {
                    throw new IllegalStateException("Order can only be confirmed from PLACED status");
                }
                break;
            case CONFIRMED:
                if (newStatus != OrderStatus.OUT_FOR_DELIVERY) {
                    throw new IllegalStateException("Order can only be marked as OUT_FOR_DELIVERY from CONFIRMED status");
                }
                break;
            case OUT_FOR_DELIVERY:
                if (newStatus != OrderStatus.DELIVERED) {
                    throw new IllegalStateException("Order can only be marked as DELIVERED from OUT_FOR_DELIVERY status");
                }
                break;
            case DELIVERED:
                throw new IllegalStateException("Cannot update status of a delivered order");
            default:
                throw new IllegalStateException("Invalid current status");
        }
    }

    @Override
    public List<OrderResponse> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId)
                .stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> getOrdersByRestaurant(Long restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId)
                .stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .map(orderMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
} 