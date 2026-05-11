package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
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
@Schema(description = "Order data transfer object")
public class OrderDto {

  @Schema(description = "Order id", example = "1")
  private Long id;

  @Schema(description = "Order creation date", example = "2026-04-06T12:00:00")
  private LocalDateTime orderDate;

  @NotBlank(message = "Status must not be blank")
  @Schema(description = "Order status", example = "NEW")
  private String status;

  @PositiveOrZero(message = "Total price must be greater than or equal to 0")
  @Schema(description = "Total price", example = "120.5")
  private Double totalPrice;

  @Schema(description = "Order description", example = "Oil change and diagnostics")
  private String description;

  @Schema(description = "Order completion date", example = "2026-04-07T15:30:00")
  private LocalDateTime completionDate;

  @NotNull(message = "Car id must not be null")
  @Schema(description = "Related car id", example = "1")
  private Long carId;

  @Schema(description = "Ids of selected services")
  private List<Long> serviceIds;

  @Schema(description = "Ids of selected spare parts")
  private List<Long> spareIds;

  @Schema(description = "Car info", example = "Toyota Camry 2020")
  private String carInfo;

  @Schema(description = "Selected service names")
  private List<String> serviceNames;

  private String clientName;

  @Schema(description = "Selected spare part names")
  private List<String> spareNames;
}