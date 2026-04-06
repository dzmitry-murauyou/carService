package com.example.carservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
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

  @NotBlank(message = "Status must not be blank")
  private String status;

  @PositiveOrZero(message = "Total price must be greater than or equal to 0")
  private Double totalPrice;

  private String description;
  private LocalDateTime completionDate;

  @NotNull(message = "Car id must not be null")
  private Long carId;

  private List<Long> serviceIds;
  private List<Long> spareIds;

  private String carInfo;
  private List<String> serviceNames;
  private List<String> spareNames;
}