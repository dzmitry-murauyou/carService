package com.example.carservice.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
  private Long id;
  private LocalDateTime orderDate;
  private String status; // NEW, IN_PROGRESS, COMPLETED, CANCELLED
  private Double totalPrice;
  private String description;
  private LocalDateTime completionDate;

  private Long carId;
  private Long mechanicId;
  private List<Long> serviceIds;
  private List<Long> spareIds;

  private String carInfo;
  private String mechanicName;
  private List<String> serviceNames;
  private List<String> spareNames;
}