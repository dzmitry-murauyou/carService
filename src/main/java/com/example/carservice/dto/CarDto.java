package com.example.carservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {
  private Long id;
  private Long brandModelId;
  private String brand;      // ← добавляем
  private String model;      // ← добавляем
  private String licensePlate;
  private String vin;
  private Integer year;
  private Long clientId;
  private String clientName;  // имя владельца для удобства
}