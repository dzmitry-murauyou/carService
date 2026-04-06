package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Spare part data transfer object")
public class SpareDto {

  @Schema(description = "Spare part id", example = "1")
  private Long id;

  @NotBlank(message = "Name must not be blank")
  @Size(max = 255, message = "Name must not exceed 255 characters")
  @Schema(description = "Spare part name", example = "Oil filter")
  private String name;

  @NotBlank(message = "Part number must not be blank")
  @Size(max = 255, message = "Part number must not exceed 255 characters")
  @Schema(description = "Part number", example = "OF-12345")
  private String partNumber;

  @NotNull(message = "Price must not be null")
  @PositiveOrZero(message = "Price must be greater than or equal to 0")
  @Schema(description = "Price", example = "15.99")
  private Double price;

  @NotNull(message = "Quantity in stock must not be null")
  @PositiveOrZero(message = "Quantity in stock must be greater than or equal to 0")
  @Schema(description = "Quantity in stock", example = "20")
  private Integer quantityInStock;

  @Size(max = 255, message = "Manufacturer must not exceed 255 characters")
  @Schema(description = "Manufacturer", example = "Bosch")
  private String manufacturer;
}