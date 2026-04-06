package com.example.carservice.controller;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.service.ServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Tag(name = "Services", description = "API for managing service catalog")
public class ServiceController {

  private final ServiceInterface service;

  @Operation(summary = "Get all services")
  @GetMapping("/all")
  public List<ServiceDto> getAllServices() {
    return service.getAllServices();
  }

  @Operation(summary = "Get service by id")
  @GetMapping("/{id}")
  public ServiceDto getServiceById(@PathVariable Long id) {
    return service.getServiceById(id);
  }

  @Operation(summary = "Get services by category")
  @GetMapping
  public List<ServiceDto> getServicesByParams(
      @RequestParam(required = false) String category) {

    if (category != null) {
      return service.getServicesByCategory(category);
    }
    return service.getAllServices();
  }
}