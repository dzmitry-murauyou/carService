package com.example.carservice.controller;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.service.ClientService;
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
public class ClientController {

  private final ClientService clientService;

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

  @GetMapping("/{id}")
  public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
    ClientDto client = clientService.getClientById(id);
    return ResponseEntity.ok(client);
  }

  @PostMapping
  public ResponseEntity<ClientDto> createClient(@RequestBody ClientDto clientDto) {
    ClientDto created = clientService.createClient(clientDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ClientDto> updateClient(@PathVariable Long id,
                                                @RequestBody ClientDto clientDto) {
    ClientDto updated = clientService.updateClient(id, clientDto);
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
    clientService.deleteClient(id);
    return ResponseEntity.noContent().build();
  }

  @PostMapping("/test-without-transaction")
  public ResponseEntity<String> testWithoutTransaction(@RequestBody ClientDto clientDto) {
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

  @PostMapping("/test-with-transaction")
  public ResponseEntity<String> testWithTransaction(@RequestBody ClientDto clientDto) {
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