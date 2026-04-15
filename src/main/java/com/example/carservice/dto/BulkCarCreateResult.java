package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Bulk car creation result")
public class BulkCarCreateResult {

  @Schema(description = "Total number of cars requested", example = "30")
  private int totalRequested;

  @Schema(description = "Number of successfully created cars", example = "30")
  private int successfullyCreated;

  @Schema(description = "Number of failed cars", example = "0")
  private int failed;

  @Schema(description = "List of created cars")
  private List<CarDto> createdCars;

  @Schema(description = "Errors per car index")
  private Map<Integer, String> errors;

  public void addError(int index, String error) {
    if (errors == null) {
      errors = new HashMap<>();
    }
    errors.put(index, error);
    failed++;
  }

  public void addCreatedCar(CarDto car) {
    if (createdCars == null) {
      createdCars = new ArrayList<>();
    }
    createdCars.add(car);
    successfullyCreated++;
  }
}