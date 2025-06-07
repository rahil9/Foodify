package com.example.service;

import com.example.dto.PaymentRequest;
import com.example.dto.PaymentResponse;
import com.example.entity.Payment;
import com.example.enums.PaymentMethod;
import com.example.enums.PaymentStatus;
import com.example.mapper.PaymentMapper;
import com.example.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public interface PaymentService {
    PaymentResponse processPayment(PaymentRequest request);
    Payment initiatePayment(Payment payment);
    Payment confirmPayment(Long orderId, String transactionId);
    Payment getPaymentStatus(Long orderId);
    List<PaymentResponse> getPaymentsByOrder(Long orderId);
    PaymentResponse getPaymentById(Long paymentId);
    List<PaymentResponse> getPaymentsByStatus(PaymentStatus status);
    Payment updatePaymentStatus(Long paymentId, PaymentStatus status);
}
