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
@Schema(description = "Mechanic data transfer object")
public class MechanicDto {

  @Schema(description = "Mechanic id", example = "1")
  private Long id;

  @NotBlank(message = "First name must not be blank")
  @Size(max = 40, message = "First name must not exceed 40 characters")
  @Schema(description = "Mechanic first name", example = "Petr")
  private String firstName;

  @NotBlank(message = "Last name must not be blank")
  @Size(max = 40, message = "Last name must not exceed 40 characters")
  @Schema(description = "Mechanic last name", example = "Petrov")
  private String lastName;

  @Size(max = 13, message = "Phone must not exceed 13 characters")
  @Schema(description = "Mechanic phone", example = "+375291234567")
  private String phone;

  @Schema(description = "Hire date", example = "2023-01-10")
  private LocalDate hireDate;

  @Schema(description = "Ids of services that mechanic can perform")
  private Set<Long> serviceIds;

  @Schema(description = "Names of services that mechanic can perform")
  private Set<String> serviceNames;
}