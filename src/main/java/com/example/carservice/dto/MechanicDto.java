package com.example.carservice.dto;

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
  private String firstName;
  private String lastName;
  private String phone;
  private LocalDate hireDate;
  private Set<Long> serviceIds;
  private Set<String> serviceNames;
}