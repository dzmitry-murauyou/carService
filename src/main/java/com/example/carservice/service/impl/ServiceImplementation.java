package com.example.carservice.service.impl;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.dto.mapper.ServiceMapper;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.service.ServiceInterface;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ServiceImplementation implements ServiceInterface {

  private final ServiceRepository repository;
  private final ServiceMapper mapper;

  @Override
  public List<ServiceDto> getAllServices() {
    return repository.findAll().stream()
        .map(mapper::toDto)        // ← Entity → DTO
        .toList();
  }

  @Override
  public ServiceDto getServiceById(Long id) {
    return repository.findById(id)
        .map(mapper::toDto)        // ← Entity → DTO
        .orElse(null);
  }

  @Override
  public List<ServiceDto> getServicesByCategory(String category) {
    return repository.findByCategory(category).stream()
        .map(mapper::toDto)
        .toList();
  }

}