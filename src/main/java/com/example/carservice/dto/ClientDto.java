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
public class ClientDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String phone;
  private String email;
  private String address;
  private LocalDate registrationDate;
}