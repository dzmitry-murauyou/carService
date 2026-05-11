package com.example.carservice.service.impl;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.dto.mapper.ServiceMapper;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.service.ServiceInterface;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServiceImplementation implements ServiceInterface {

  private final ServiceRepository repository;
  private final ServiceMapper mapper;

  @Override
  public List<ServiceDto> getAllServices() {
    log.info("Fetching all services");
    List<ServiceDto> result = repository.findAll().stream()
        .map(mapper::toDto)
        .toList();
    log.info("Found {} services", result.size());
    return result;
  }

  @Override
  public ServiceDto getServiceById(Long id) {
    return repository.findById(id)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  public List<ServiceDto> getServicesByCategory(String category) {
    return repository.findByCategoryName(category).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public ServiceDto createService(ServiceDto dto) {
    log.info("Creating service: {}", dto.getName());
    ServiceEntity entity = mapper.toEntity(dto);
    entity.setId(null);
    ServiceEntity saved = repository.save(entity);
    log.info("✅ Service created with ID: {}", saved.getId());
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public ServiceDto updateService(Long id, ServiceDto dto) {
    log.info("Updating service ID {}: {}", id, dto.getName());
    ServiceEntity entity = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Услуга с ID " + id + " не найдена"));

    entity.setName(dto.getName());
    entity.setDescription(dto.getDescription());
    entity.setPrice(dto.getPrice());
    entity.setDurationMinutes(mapper.parseDuration(dto.getDuration()));
    entity.setAvailable(dto.getStatus() == null || !"inactive".equals(dto.getStatus()));

    ServiceEntity saved = repository.save(entity);
    log.info("✅ Service updated: {}", saved.getId());
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public void deleteService(Long id) {
    log.info("Deleting service ID: {}", id);
    if (!repository.existsById(id)) {
      throw new RuntimeException("Услуга с ID " + id + " не найдена");
    }
    repository.deleteById(id);
    log.info("✅ Service deleted: {}", id);
  }
}