package com.example.carservice.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class ClientDto {
  private Long id;
  private String firstName;
  private String lastName;
  private String phone;
  private String email;
  private String address;
  private LocalDate registrationDate;
  private List<CarDto> cars;  // ← список машин клиента
}