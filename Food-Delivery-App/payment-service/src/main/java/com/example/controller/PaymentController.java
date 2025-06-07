package com.example.controller;

import com.example.dto.DTO;
import com.example.dto.PaymentRequest;
import com.example.dto.PaymentResponse;
import com.example.entity.Payment;
import com.example.enums.PaymentStatus;
import com.example.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/process")
    public ResponseEntity<DTO<PaymentResponse>> processPayment(@RequestBody PaymentRequest request) {
        PaymentResponse payment = paymentService.processPayment(request);
        return ResponseEntity.ok(DTO.<PaymentResponse>builder()
                .success(true)
                .message("Payment processed successfully")
                .data(payment)
                .build());
    }

    @PostMapping("/initiate")
    public ResponseEntity<DTO<Payment>> initiatePayment(@RequestBody Payment payment) {
        Payment initiatedPayment = paymentService.initiatePayment(payment);
        return ResponseEntity.ok(DTO.<Payment>builder()
                .success(true)
                .message("Payment initiated successfully")
                .data(initiatedPayment)
                .build());
    }

    @PostMapping("/confirm")
    public ResponseEntity<DTO<Payment>> confirmPayment(
            @RequestParam Long orderId,
            @RequestParam String transactionId) {
        Payment payment = paymentService.confirmPayment(orderId, transactionId);
        return ResponseEntity.ok(DTO.<Payment>builder()
                .success(true)
                .message("Payment confirmed successfully")
                .data(payment)
                .build());
    }

    @GetMapping("/{orderId}/status")
    public ResponseEntity<DTO<Payment>> getPaymentStatus(@PathVariable Long orderId) {
        Payment payment = paymentService.getPaymentStatus(orderId);
        return ResponseEntity.ok(DTO.<Payment>builder()
                .success(true)
                .message("Payment status fetched successfully")
                .data(payment)
                .build());
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<DTO<List<PaymentResponse>>> getPaymentsByOrder(@PathVariable Long orderId) {
        List<PaymentResponse> payments = paymentService.getPaymentsByOrder(orderId);
        return ResponseEntity.ok(DTO.<List<PaymentResponse>>builder()
                .success(true)
                .message("Payments fetched successfully by order")
                .data(payments)
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DTO<PaymentResponse>> getPaymentById(@PathVariable Long id) {
        PaymentResponse payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(DTO.<PaymentResponse>builder()
                .success(true)
                .message("Payment fetched successfully")
                .data(payment)
                .build());
    }

    @PutMapping("/{paymentId}/status")
    public ResponseEntity<DTO<Payment>> updatePaymentStatus(
            @PathVariable Long paymentId,
            @RequestParam PaymentStatus status) {
        Payment updatedPayment = paymentService.updatePaymentStatus(paymentId, status);
        return ResponseEntity.ok(DTO.<Payment>builder()
                .success(true)
                .message("Payment status updated successfully")
                .data(updatedPayment)
                .build());
    }
}
