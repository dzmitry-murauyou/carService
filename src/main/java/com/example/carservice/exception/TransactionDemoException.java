package com.example.carservice.exception;

public class TransactionDemoException extends RuntimeException {

  public TransactionDemoException(String message) {
    super(message);
  }

  public TransactionDemoException(String message, Throwable cause) {
    super(message, cause);
  }
}