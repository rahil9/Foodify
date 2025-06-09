package com.example.service;

import com.example.dto.PaymentRequest;
import com.example.dto.PaymentResponse;
import com.example.entity.Payment;
import com.example.enums.PaymentMethod;
import com.example.enums.PaymentStatus;
import com.example.mapper.PaymentMapper;
import com.example.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public PaymentServiceImpl(PaymentRepository paymentRepository, PaymentMapper paymentMapper) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
    }

    @Override
    @Transactional
    public PaymentResponse processPayment(PaymentRequest request) {
        // Payment payment = paymentMapper.mapToModel(request);
        // payment.setStatus(PaymentStatus.PENDING);
        // payment.setTransactionId(generateTransactionId());
        //
        // // Simulate payment processing
        // boolean paymentSuccess = processPaymentWithProvider(payment);
        //
        // payment.setStatus(paymentSuccess ? PaymentStatus.SUCCESS :
        // PaymentStatus.FAILED);
        // return paymentMapper.mapToDTO(paymentRepository.save(payment));

        List<Payment> existingPayments = paymentRepository.findByOrderId(request.getOrderId());

        // Find an existing pending payment
        Payment payment = existingPayments.stream()
                .filter(p -> p.getStatus() == PaymentStatus.PENDING)
                .findFirst()
                .orElseGet(() -> paymentMapper.mapToModel(request)); // Create a new one if none exist

        // If it's an existing payment, update it
        payment.setMethod(request.getMethod());
        payment.setTransactionId(generateTransactionId());

        // Simulate payment processing
        boolean paymentSuccess = processPaymentWithProvider(payment);
        payment.setStatus(paymentSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED);

        return paymentMapper.mapToDTO(paymentRepository.save(payment));
    }

    @Override
    public Payment initiatePayment(Payment payment) {
        payment.setStatus(PaymentStatus.PENDING);
        payment.setTransactionId(generateTransactionId());
        return paymentRepository.save(payment);
    }

    @Override
    public Payment confirmPayment(Long orderId, String transactionId) {
        Payment payment = paymentRepository.findByOrderId(orderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (!payment.getTransactionId().equals(transactionId)) {
            throw new RuntimeException("Invalid transaction ID");
        }

        payment.setStatus(PaymentStatus.SUCCESS);
        return paymentRepository.save(payment);
    }

    @Override
    public Payment getPaymentStatus(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public List<PaymentResponse> getPaymentsByOrder(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .stream()
                .map(paymentMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaymentResponse getPaymentById(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .map(paymentMapper::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public List<PaymentResponse> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status)
                .stream()
                .map(paymentMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Payment updatePaymentStatus(Long paymentId, PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setStatus(status);
        return paymentRepository.save(payment);
    }

    private String generateTransactionId() {
        return UUID.randomUUID().toString();
    }

    private boolean processPaymentWithProvider(Payment payment) {
        // Simulate payment processing based on payment method
        switch (payment.getMethod()) {
            case CARD:
                return simulateCardPayment(payment);
            case UPI:
                return simulateUPIPayment(payment);
            case COD:
                return true; // COD is always successful
            default:
                return false;
        }
    }

    private boolean simulateCardPayment(Payment payment) {
        // Simulate card payment processing
        try {
            Thread.sleep(2000); // Simulate network delay
            return Math.random() > 0.1; // 90% success rate
        } catch (InterruptedException e) {
            return false;
        }
    }

    private boolean simulateUPIPayment(Payment payment) {
        // Simulate UPI payment processing
        try {
            Thread.sleep(1500); // Simulate network delay
            return Math.random() > 0.05; // 95% success rate
        } catch (InterruptedException e) {
            return false;
        }
    }

}