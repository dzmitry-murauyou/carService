package com.example.carservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SpareDto {
  private Long id;
  private String name;
  private String partNumber;
  private Double price;
  private Integer quantityInStock;
  private String manufacturer;
}