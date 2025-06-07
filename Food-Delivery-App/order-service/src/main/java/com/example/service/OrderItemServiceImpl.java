package com.example.service;

import com.example.dto.OrderItemRequest;
import com.example.dto.OrderItemResponse;
import com.example.entity.Order;
import com.example.entity.OrderItem;
import com.example.exception.OrderItemNotFoundException;
import com.example.mapper.OrderItemMapper;
import com.example.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderItemServiceImpl implements OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderItemMapper orderItemMapper;

    @Override
    @Transactional
    public List<OrderItem> saveOrderItems(List<OrderItemRequest> orderItemRequests, Order order) {
        List<OrderItem> orderItems = orderItemRequests.stream()
                .map(request -> OrderItem.builder()
                        .menuItemId(request.getMenuItemId())
                        .quantity(request.getQuantity())
                        .order(order)
                        .build())
                .collect(Collectors.toList());

        return orderItemRepository.saveAll(orderItems);
    }

    @Override
    public List<OrderItemResponse> getOrderItemsByOrderId(Long orderId) {
        return orderItemRepository.findByOrderId(orderId).stream()
                .map(orderItemMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public OrderItemResponse updateOrderItemQuantity(Long orderItemId, int quantity) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new OrderItemNotFoundException("Order item not found with id: " + orderItemId));
        
        orderItem.setQuantity(quantity);
        return orderItemMapper.mapToDTO(orderItemRepository.save(orderItem));
    }

    @Override
    @Transactional
    public void deleteOrderItem(Long orderItemId) {
        if (!orderItemRepository.existsById(orderItemId)) {
            throw new OrderItemNotFoundException("Order item not found with id: " + orderItemId);
        }
        orderItemRepository.deleteById(orderItemId);
    }
}
