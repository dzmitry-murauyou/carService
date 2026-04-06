package com.example.carservice.dto;

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
public class MechanicDto {

  private Long id;

  @NotBlank(message = "First name must not be blank")
  @Size(max = 40, message = "First name must not exceed 40 characters")
  private String firstName;

  @NotBlank(message = "Last name must not be blank")
  @Size(max = 40, message = "Last name must not exceed 40 characters")
  private String lastName;

  @Size(max = 13, message = "Phone must not exceed 13 characters")
  private String phone;

  private LocalDate hireDate;

  private Set<Long> serviceIds;
  private Set<String> serviceNames;
}