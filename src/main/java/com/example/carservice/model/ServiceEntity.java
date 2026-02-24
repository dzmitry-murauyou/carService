package com.example.carservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceEntity {
  private Long id;
  private String name;
  private String description;
  private Double price;
  private Integer durationMinutes;
  private String category;
  private Boolean available;
  private String masterName;
  private String note;
}