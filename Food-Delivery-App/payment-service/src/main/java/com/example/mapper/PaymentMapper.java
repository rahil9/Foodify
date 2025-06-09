package com.example.mapper;

import com.example.dto.PaymentRequest;
import com.example.dto.PaymentResponse;
import com.example.entity.Payment;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public Payment mapToModel(PaymentRequest request) {
        Payment payment = new Payment();
        payment.setOrderId(request.getOrderId());
        payment.setMethod(request.getMethod());
        payment.setStatus(null); // Status will be set during processing
        payment.setTransactionId(null); // Transaction ID will be generated during processing
        return payment;
    }

    public PaymentResponse mapToDTO(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getOrderId(),
                payment.getMethod(),
                payment.getStatus(),
                payment.getTransactionId());
    }
}
