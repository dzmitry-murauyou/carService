package com.example.carservice.exception;

public class CarBrandModelNotFoundException extends RuntimeException {
  public CarBrandModelNotFoundException(String message) {
    super(message);
  }
}