package com.example.carservice.dto;

import java.time.LocalDate;
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
  private String specialization;
  private LocalDate hireDate;
  private String phone;
  private Double salary;
}