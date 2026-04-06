package com.example.carservice.dto;

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
public class SpareDto {

  private Long id;

  @NotBlank(message = "Name must not be blank")
  @Size(max = 255, message = "Name must not exceed 255 characters")
  private String name;

  @NotBlank(message = "Part number must not be blank")
  @Size(max = 255, message = "Part number must not exceed 255 characters")
  private String partNumber;

  @NotNull(message = "Price must not be null")
  @PositiveOrZero(message = "Price must be greater than or equal to 0")
  private Double price;

  @NotNull(message = "Quantity in stock must not be null")
  @PositiveOrZero(message = "Quantity in stock must be greater than or equal to 0")
  private Integer quantityInStock;

  @Size(max = 255, message = "Manufacturer must not exceed 255 characters")
  private String manufacturer;
}