package com.example.dto;

import com.example.enums.PaymentMethod;
import com.example.enums.PaymentStatus;
import lombok.Data;

@Data
public class PaymentRequest {
    private Long orderId;
    private PaymentMethod method;
    private PaymentStatus status;
    private String transactionId;
}
