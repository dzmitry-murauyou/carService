package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;

@Data
@Schema(description = "Client data transfer object")
public class ClientDto {

  @Schema(description = "Client id", example = "1")
  private Long id;

  @NotBlank(message = "First name must not be blank")
  @Size(max = 40, message = "First name must not exceed 40 characters")
  @Schema(description = "Client first name", example = "Ivan")
  private String firstName;

  @NotBlank(message = "Last name must not be blank")
  @Size(max = 40, message = "Last name must not exceed 40 characters")
  @Schema(description = "Client last name", example = "Ivanov")
  private String lastName;

  @NotBlank(message = "Phone must not be blank")
  @Size(max = 20, message = "Phone must not exceed 20 characters")
  @Schema(description = "Client phone", example = "+375291112233")
  private String phone;

  @Email(message = "Email must be valid")
  @Size(max = 100, message = "Email must not exceed 100 characters")
  @Schema(description = "Client email", example = "ivanov@mail.com")
  private String email;

  @Size(max = 200, message = "Address must not exceed 200 characters")
  @Schema(description = "Client address", example = "Minsk, Lenina 10")
  private String address;

  @Schema(description = "Registration date", example = "2024-05-12")
  private LocalDate registrationDate;

  @Valid
  @Schema(description = "Client cars")
  private List<CarDto> cars;
}