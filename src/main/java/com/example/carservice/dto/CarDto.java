package com.example.carservice.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {

  private Long id;
  private Long brandModelId;

  @NotBlank(message = "Brand must not be blank")
  private String brand;

  @NotBlank(message = "Model must not be blank")
  private String model;

  @NotBlank(message = "License plate must not be blank")
  @Size(min = 4, max = 10, message = "License plate length must be between 4 and 10")
  private String licensePlate;

  @NotBlank(message = "VIN must not be blank")
  @Size(min = 17, max = 17, message = "VIN must contain exactly 17 characters")
  private String vin;

  @Min(value = 1900, message = "Year must be greater than or equal to 1900")
  @Max(value = 2100, message = "Year must be less than or equal to 2100")
  private Integer year;

  private Long clientId;
  private String clientName;
}