package com.example.exception;

import javax.naming.AuthenticationException;

public class CredentialsNotValidException extends AuthenticationException {
    public CredentialsNotValidException(String message){super(message);}
}
