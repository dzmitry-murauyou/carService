package com.example.carservice.controller;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.service.ServiceInterface;
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
public class ServiceController {

  private final ServiceInterface service;  // ← интерфейс, а не реализация

  @GetMapping("/all")
  public List<ServiceDto> getAllServices() {
    return service.getAllServices();     // ← уже DTO
  }

  @GetMapping("/{id}")
  public ServiceDto getServiceById(@PathVariable Long id) {
    return service.getServiceById(id);   // ← уже DTO
  }

  @GetMapping
  public List<ServiceDto> getServicesByParams(
      @RequestParam(required = false) String category) {

    if (category != null) {
      return service.getServicesByCategory(category);
    }
    return service.getAllServices();
  }
}