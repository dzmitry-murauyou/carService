package com.example.carservice.exception;

public class OrderOperationException extends RuntimeException {
  public OrderOperationException(String message) {
    super(message);
  }
}