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
  private String brand;
  private String model;
  private Integer year;
  private String licensePlate;
  private String vin;
  private Long clientId;
  private String clientName;
}