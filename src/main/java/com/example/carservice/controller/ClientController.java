package com.example.carservice.controller;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.exception.ResourceNotFoundException;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clients")
@RequiredArgsConstructor
public class ClientController {

  private final ClientService clientService;

  @GetMapping
  public ResponseEntity<List<ClientDto>> getAllClients() {
    return ResponseEntity.ok(clientService.getAllClients());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
    ClientDto client = clientService.getClientById(id);
    if (client == null) {
      throw new ResourceNotFoundException("Client not found with id: " + id);
    }
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
    if (updated == null) {
      throw new ResourceNotFoundException("Client not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
    clientService.deleteClient(id);
    return ResponseEntity.noContent().build();
  }
}