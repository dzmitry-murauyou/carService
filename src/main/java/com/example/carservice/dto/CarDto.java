package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Car data transfer object")
public class CarDto {

  @Schema(description = "Car id", example = "1")
  private Long id;


  @NotBlank(message = "Brand must not be blank")
  @Schema(description = "Car brand", example = "Toyota")
  private String brand;

  @NotBlank(message = "Model must not be blank")
  @Schema(description = "Car model", example = "Camry")
  private String model;

  @NotBlank(message = "License plate must not be blank")
  @Size(min = 4, max = 10, message = "License plate length must be between 4 and 10")
  @Schema(description = "License plate", example = "1234AB-7")
  private String licensePlate;

  @NotBlank(message = "VIN must not be blank")
  @Size(min = 17, max = 17, message = "VIN must contain exactly 17 characters")
  @Schema(description = "VIN code", example = "1HGCM82633A123456")
  private String vin;

  @Min(value = 1900, message = "Year must be greater than or equal to 1900")
  @Max(value = 2100, message = "Year must be less than or equal to 2100")
  @Schema(description = "Manufacturing year", example = "2020")
  private Integer year;

  @Schema(description = "Client id", example = "1")
  private Long clientId;

  @Schema(description = "Client full name", example = "Ivan Ivanov")
  private String clientName;
}