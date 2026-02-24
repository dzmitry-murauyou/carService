package com.example.carservice.controller;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.dto.mapper.ServiceMapper;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.service.ServiceInterface;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

  private final ServiceInterface service;
  private final ServiceMapper mapper;

  @RequestMapping(value = "/all", method = RequestMethod.GET)
  public List<ServiceDto> getAllServices() {
    return service.getAllServices().stream()
        .map(mapper::toDto)
        .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ServiceDto getServiceById(@PathVariable Long id) {
    ServiceEntity entity = service.getServiceById(id);
    if (entity == null) {
      return null;
    }
    return mapper.toDto(entity);
  }

  @GetMapping
  public List<ServiceDto> getServicesByParams(
      @RequestParam(required = false) String category,
      @RequestParam(required = false) Boolean available) {

    List<ServiceEntity> services = service.getAllServices();

    services = filterByCategory(services, category);
    services = filterByAvailability(services, available);

    return services.stream()
        .map(mapper::toDto)
        .collect(Collectors.toList());
  }

  private List<ServiceEntity> filterByCategory(List<ServiceEntity> services,
                                               String category) {
    if (category == null || category.isEmpty()) {
      return services;
    }
    return services.stream()
        .filter(s -> category.equalsIgnoreCase(s.getCategory()))
        .collect(Collectors.toList());
  }

  private List<ServiceEntity> filterByAvailability(List<ServiceEntity> services,
                                                   Boolean available) {
    if (available == null) {
      return services;
    }
    return services.stream()
        .filter(s -> available.equals(s.getAvailable()))
        .collect(Collectors.toList());
  }
}