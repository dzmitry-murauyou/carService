package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Bulk car creation request")
public class BulkCarCreateRequest {

  @NotNull(message = "Client id is required")
  @Schema(description = "Client (taxi park) id", example = "1")
  private Long clientId;

  @NotEmpty(message = "Cars list cannot be empty")
  @Valid
  @Schema(description = "List of cars to add")
  private List<CarDto> cars;
}