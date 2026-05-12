package com.example.carservice.controller;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.service.ServiceInterface;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

  private final ServiceInterface service;

  @GetMapping
  public ResponseEntity<List<ServiceDto>> getAll() {
    return ResponseEntity.ok(service.getAllServices());
  }

  @GetMapping("/{id}")
  public ResponseEntity<ServiceDto> getById(@PathVariable Long id) {
    ServiceDto dto = service.getServiceById(id);
    return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
  }

  @GetMapping("/category/{category}")
  public ResponseEntity<List<ServiceDto>> getByCategory(@PathVariable String category) {
    return ResponseEntity.ok(service.getServicesByCategory(category));
  }

  @PostMapping
  public ResponseEntity<ServiceDto> create(@RequestBody ServiceDto dto) {
    log.info("POST /api/services - Creating: {}", dto.getName());
    ServiceDto created = service.createService(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<ServiceDto> update(@PathVariable Long id, @RequestBody ServiceDto dto) {
    log.info("PUT /api/services/{} - Updating", id);
    try {
      ServiceDto updated = service.updateService(id, dto);
      return ResponseEntity.ok(updated);
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    log.info("DELETE /api/services/{}", id);
    try {
      service.deleteService(id);
      return ResponseEntity.noContent().build();
    } catch (RuntimeException e) {
      return ResponseEntity.notFound().build();
    }
  }
}