package com.example.carservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {
  private Long id;
  private Long brandModelId;
  private String brand;
  private String model;
  private String licensePlate;
  private String vin;
  private Integer year;
  private Long clientId;
  private String clientName;
}