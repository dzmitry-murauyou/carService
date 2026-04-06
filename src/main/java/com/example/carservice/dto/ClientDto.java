package com.example.carservice.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
public class ClientDto {

  private Long id;

  @NotBlank(message = "First name must not be blank")
  @Size(max = 40, message = "First name must not exceed 40 characters")
  private String firstName;

  @NotBlank(message = "Last name must not be blank")
  @Size(max = 40, message = "Last name must not exceed 40 characters")
  private String lastName;

  @NotBlank(message = "Phone must not be blank")
  @Size(max = 20, message = "Phone must not exceed 20 characters")
  private String phone;

  @Email(message = "Email must be valid")
  @Size(max = 100, message = "Email must not exceed 100 characters")
  private String email;

  @Size(max = 200, message = "Address must not exceed 200 characters")
  private String address;

  private LocalDate registrationDate;

  @Valid
  private List<CarDto> cars;
}