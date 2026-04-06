package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "DTO with mechanic information")
public class MechanicDto {

  private Long id;

  @NotBlank(message = "Mechanic first name is required")
  @Size(max = 40, message = "Mechanic first name must contain no more than 40 characters")
  private String firstName;

  @NotBlank(message = "Mechanic last name is required")
  @Size(max = 40, message = "Mechanic last name must contain no more than 40 characters")
  private String lastName;

  @Size(max = 13, message = "Mechanic phone number must contain no more than 13 characters")
  private String phone;

  @Schema(description = "Date when mechanic was hired", example = "2023-01-10")
  private LocalDate hireDate;

  @Schema(description = "Identifiers of assigned services")
  private Set<Long> serviceIds;

  @Schema(description = "Names of assigned services")
  private Set<String> serviceNames;
}