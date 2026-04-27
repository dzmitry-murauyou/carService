package com.example.carservice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "Partial update payload for client")
public class ClientPatchDto {

  @Size(max = 40, message = "First name must not exceed 40 characters")
  @Schema(description = "Client first name", example = "Ivan")
  private String firstName;

  @Size(max = 40, message = "Last name must not exceed 40 characters")
  @Schema(description = "Client last name", example = "Petrov")
  private String lastName;

  @Size(max = 20, message = "Phone must not exceed 20 characters")
  @Schema(description = "Client phone", example = "+375291112233")
  private String phone;

  @Email(message = "Email must be valid")
  @Size(max = 100, message = "Email must not exceed 100 characters")
  @Schema(description = "Client email", example = "petrov@mail.com")
  private String email;

  @Size(max = 200, message = "Address must not exceed 200 characters")
  @Schema(description = "Client address", example = "Minsk, Lenina 10")
  private String address;
}
