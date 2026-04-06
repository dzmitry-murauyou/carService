package com.example.carservice.controller;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
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
  @GetMapping
  public ResponseEntity<List<ClientDto>> getClients(
      @RequestParam(required = false) String lastName,
      @RequestParam(required = false) String phone) {

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
  @GetMapping("/{id}")
  public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
    ClientDto client = clientService.getClientById(id);
    return ResponseEntity.ok(client);
  }

  @Operation(summary = "Create new client")
  @PostMapping
  public ResponseEntity<ClientDto> createClient(@Valid @RequestBody ClientDto clientDto) {
    ClientDto created = clientService.createClient(clientDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @Operation(summary = "Update client by id")
  @PutMapping("/{id}")
  public ResponseEntity<ClientDto> updateClient(
      @PathVariable Long id,
      @Valid @RequestBody ClientDto clientDto
  ) {
    ClientDto updated = clientService.updateClient(id, clientDto);
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Delete client by id")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
    clientService.deleteClient(id);
    return ResponseEntity.noContent().build();
  }

  @Operation(summary = "Transaction demo without @Transactional")
  @PostMapping("/test-without-transaction")
  public ResponseEntity<String> testWithoutTransaction(@Valid @RequestBody ClientDto clientDto) {
    try {
      clientService.createClientWithNewCarsWithoutTransaction(clientDto);
      return ResponseEntity.ok("Клиент и машины созданы");
    } catch (Exception e) {
      return ResponseEntity.status(500).body(
          "Ошибка: " + e.getMessage() + "\n"
              + "НО клиент и машины УЖЕ в БД! (частичное сохранение)"
      );
    }
  }

  @Operation(summary = "Transaction demo with @Transactional")
  @PostMapping("/test-with-transaction")
  public ResponseEntity<String> testWithTransaction(@Valid @RequestBody ClientDto clientDto) {
    try {
      clientService.createClientWithNewCarsWithTransaction(clientDto);
      return ResponseEntity.ok("Клиент и машины созданы");
    } catch (Exception e) {
      return ResponseEntity.status(500).body(
          "Ошибка: " + e.getMessage() + "\n"
              + "Клиент и машины НЕ сохранены! (полный откат)"
      );
    }
  }
}