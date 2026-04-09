package com.example.carservice.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> handleValidationException(
      MethodArgumentNotValidException ex,
      HttpServletRequest request
  ) {
    Map<String, String> details = new HashMap<>();
    for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
      details.put(fieldError.getField(), fieldError.getDefaultMessage());
    }

    ApiError error = ApiError.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.BAD_REQUEST.value())
        .error("Validation Failed")
        .message("Input validation error")
        .path(request.getRequestURI())
        .details(details)
        .build();

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiError> handleConstraintViolation(
      ConstraintViolationException ex,
      HttpServletRequest request
  ) {
    ApiError error = ApiError.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.BAD_REQUEST.value())
        .error("Constraint Violation")
        .message(ex.getMessage())
        .path(request.getRequestURI())
        .build();

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<ApiError> handleDataIntegrityViolation(
      DataIntegrityViolationException ex,
      HttpServletRequest request
  ) {
    String message = "Data integrity violation (possible duplicate unique field)";

    Throwable root = ex.getMostSpecificCause();
    if (root != null && root.getMessage() != null) {
      String m = root.getMessage();
      // Customize to your constraints if you want:
      if (m.contains("cars_license_plate_key")) {
        message = "Car with this licensePlate already exists";
      } else if (m.contains("cars_vin_key")) {
        message = "Car with this VIN already exists";
      } else if (m.contains("clients_phone_key")) {
        message = "Client with this phone already exists";
      }
    }

    ApiError error = ApiError.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.CONFLICT.value())
        .error("Conflict")
        .message(message)
        .path(request.getRequestURI())
        .build();

    return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
  }


  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiError> handleResourceNotFound(
      ResourceNotFoundException ex,
      HttpServletRequest request
  ) {
    ApiError error = ApiError.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.NOT_FOUND.value())
        .error("Not Found")
        .message(ex.getMessage())
        .path(request.getRequestURI())
        .build();

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> handleGenericException(
      Exception ex,
      HttpServletRequest request
  ) {
    ApiError error = ApiError.builder()
        .timestamp(LocalDateTime.now())
        .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
        .error("Internal Server Error")
        .message(ex.getMessage())
        .path(request.getRequestURI())
        .build();

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  }
}