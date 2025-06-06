package com.example.dto;

import com.example.enums.PaymentMethod;
import com.example.enums.PaymentStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentResponse {
    private Long id;
    private Long orderId;
    private PaymentMethod method;
    private PaymentStatus status;
    private String transactionId;
}
