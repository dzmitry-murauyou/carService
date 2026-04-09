package com.example.carservice.controller;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.exception.ApiError;
import com.example.carservice.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
@Tag(name = "Clients", description = "API for managing clients")
public class ClientController {

  private final ClientService clientService;

  @Operation(summary = "Get all clients or filter by last name / phone")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "404",
          description = "Client not found (when searching by phone)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping
  public ResponseEntity<List<ClientDto>> getClients(
      @RequestParam(required = false) String lastName,
      @RequestParam(required = false) String phone
  ) {

    if (phone != null) {
      ClientDto client = clientService.getClientByPhone(phone);
      return ResponseEntity.ok(List.of(client));
    }

    if (lastName != null) {
      return ResponseEntity.ok(clientService.getClientsByLastName(lastName));
    }

    return ResponseEntity.ok(clientService.getAllClients());
  }

  @Operation(summary = "Get client by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "404",
          description = "Client not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping("/{id}")
  public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
    ClientDto client = clientService.getClientById(id); // у вас там throw ResourceNotFoundException
    return ResponseEntity.ok(client);
  }

  @Operation(summary = "Create new client")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Created"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate phone/email or other unique constraint)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @PostMapping
  public ResponseEntity<ClientDto> createClient(@Valid @RequestBody ClientDto clientDto) {
    ClientDto created = clientService.createClient(clientDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @Operation(summary = "Update client by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "404",
          description = "Client not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate phone/email or other unique constraint)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @PutMapping("/{id}")
  public ResponseEntity<ClientDto> updateClient(
      @PathVariable Long id,
      @Valid @RequestBody ClientDto clientDto
  ) {
    ClientDto updated = clientService.updateClient(id, clientDto);
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Delete client by id")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "No Content"),
      @ApiResponse(
          responseCode = "404",
          description = "Client not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (data integrity / foreign key / etc.)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
    clientService.deleteClient(id);
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "Transaction demo without @Transactional")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation/transaction demo error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate phone or other unique constraint)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @PostMapping("/test-without-transaction")
  public ResponseEntity<String> testWithoutTransaction(@Valid @RequestBody ClientDto clientDto) {
    clientService.createClientWithNewCarsWithoutTransaction(clientDto);
    return ResponseEntity.ok("Client and cars created (without @Transactional)");
  }

  @Operation(summary = "Transaction demo with @Transactional")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation/transaction demo error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate phone or other unique constraint)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @PostMapping("/test-with-transaction")
  public ResponseEntity<String> testWithTransaction(@Valid @RequestBody ClientDto clientDto) {
    clientService.createClientWithNewCarsWithTransaction(clientDto);
    return ResponseEntity.ok("Client and cars created (with @Transactional)");
  }
}