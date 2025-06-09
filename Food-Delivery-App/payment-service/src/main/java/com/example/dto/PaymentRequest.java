package com.example.dto;

import com.example.enums.PaymentMethod;
import com.example.enums.PaymentStatus;

public class PaymentRequest {
    private Long orderId;
    private PaymentMethod method;
    private PaymentStatus status;
    private String transactionId;

    public PaymentRequest() {
    }

    public PaymentRequest(Long orderId, PaymentMethod method, PaymentStatus status, String transactionId) {
        this.orderId = orderId;
        this.method = method;
        this.status = status;
        this.transactionId = transactionId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public PaymentMethod getMethod() {
        return method;
    }

    public void setMethod(PaymentMethod method) {
        this.method = method;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }
}
