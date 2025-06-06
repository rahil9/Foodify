package com.example.mapper;

import com.example.dto.PaymentRequest;
import com.example.dto.PaymentResponse;
import com.example.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public Payment mapToModel(PaymentRequest request) {
        return Payment.builder()
                .orderId(request.getOrderId())
                .method(request.getMethod())
                .status(null) // Status will be set during processing
                .transactionId(null) // Transaction ID will be generated during processing
                .build();
    }

    public PaymentResponse mapToDTO(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .orderId(payment.getOrderId())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .transactionId(payment.getTransactionId())
                .build();
    }
}
