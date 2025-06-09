package com.example.controller;

import com.example.dto.DTO;
import com.example.dto.PaymentRequest;
import com.example.dto.PaymentResponse;
import com.example.entity.Payment;
import com.example.enums.PaymentStatus;
import com.example.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {
    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/process")
    public ResponseEntity<DTO<PaymentResponse>> processPayment(@RequestBody PaymentRequest request) {
        PaymentResponse payment = paymentService.processPayment(request);
        return ResponseEntity.ok(new DTO<>(true,
                "Payment processed successfully",
                payment));
    }

    @PostMapping("/initiate")
    public ResponseEntity<DTO<Payment>> initiatePayment(@RequestBody Payment payment) {
        Payment initiatedPayment = paymentService.initiatePayment(payment);
        return ResponseEntity.ok(new DTO<>(true,
                "Payment initiated successfully",
                initiatedPayment));
    }

    @PostMapping("/confirm")
    public ResponseEntity<DTO<Payment>> confirmPayment(
            @RequestParam Long orderId,
            @RequestParam String transactionId) {
        Payment payment = paymentService.confirmPayment(orderId, transactionId);
        return ResponseEntity.ok(new DTO<>(true,
                "Payment confirmed successfully",
                payment));
    }

    @GetMapping("/{orderId}/status")
    public ResponseEntity<DTO<Payment>> getPaymentStatus(@PathVariable Long orderId) {
        Payment payment = paymentService.getPaymentStatus(orderId);
        return ResponseEntity.ok(new DTO<>(true,
                "Payment status fetched successfully",
                payment));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<DTO<List<PaymentResponse>>> getPaymentsByOrder(@PathVariable Long orderId) {
        List<PaymentResponse> payments = paymentService.getPaymentsByOrder(orderId);
        return ResponseEntity.ok(new DTO<>(true,
                "Payments fetched successfully by order",
                payments));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DTO<PaymentResponse>> getPaymentById(@PathVariable Long id) {
        PaymentResponse payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(new DTO<>(true,
                "Payment fetched successfully",
                payment));
    }

    @PutMapping("/{paymentId}/status")
    public ResponseEntity<DTO<Payment>> updatePaymentStatus(
            @PathVariable Long paymentId,
            @RequestParam PaymentStatus status) {
        Payment updatedPayment = paymentService.updatePaymentStatus(paymentId, status);
        return ResponseEntity.ok(new DTO<>(true,
                "Payment status updated successfully",
                updatedPayment));
    }
}
