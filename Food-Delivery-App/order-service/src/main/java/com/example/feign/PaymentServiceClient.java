package com.example.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "payment-service")
public interface PaymentServiceClient {
    @PostMapping("/api/payments/process")
    Object processPayment(@RequestBody Object paymentRequest, @RequestHeader("Authorization") String token);
} 