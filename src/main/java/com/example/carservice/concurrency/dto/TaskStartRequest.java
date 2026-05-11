package com.example.carservice.concurrency.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TaskStartRequest {

  @NotBlank(message = "payload is required")
  private String payload;

  @Min(value = 200, message = "delayMs must be >= 200")
  @Max(value = 100000, message = "delayMs must be <= 10000")
  private long delayMs = 1500;
}
