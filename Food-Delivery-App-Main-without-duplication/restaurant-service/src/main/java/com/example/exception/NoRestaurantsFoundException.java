package com.example.exception;

public class NoRestaurantsFoundException extends RuntimeException {
    public NoRestaurantsFoundException(String message) {
        super(message);
    }
}
