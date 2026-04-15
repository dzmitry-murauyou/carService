package com.example.carservice.exception;

public class BulkCreateException extends RuntimeException {
  public BulkCreateException(String message) {
    super(message);
  }

  public BulkCreateException(String message, Throwable cause) {
    super(message, cause);
  }
}