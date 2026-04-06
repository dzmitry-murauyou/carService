package com.example.carservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDto {

  @NotBlank(message = "Name must not be blank")
  @Size(max = 140, message = "Name must not exceed 140 characters")
  private String name;

  @Size(max = 255, message = "Description must not exceed 255 characters")
  private String description;

  @NotNull(message = "Price must not be null")
  @PositiveOrZero(message = "Price must be greater than or equal to 0")
  private Double price;

  @Size(max = 50, message = "Duration must not exceed 50 characters")
  private String duration;

  @Size(max = 100, message = "Category must not exceed 100 characters")
  private String category;

  @Size(max = 50, message = "Status must not exceed 50 characters")
  private String status;

  @Size(max = 80, message = "Master name must not exceed 80 characters")
  private String masterName;

  @Size(max = 255, message = "Note must not exceed 255 characters")
  private String note;
}