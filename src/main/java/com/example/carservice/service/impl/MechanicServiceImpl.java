package com.example.carservice.service.impl;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.dto.mapper.MechanicMapper;
import com.example.carservice.model.Mechanic;
import com.example.carservice.repository.MechanicRepository;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.service.MechanicService;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MechanicServiceImpl implements MechanicService {

  private final MechanicRepository repository;
  private final ServiceRepository serviceRepository;
  private final MechanicMapper mapper;

  private void setServicesIfProvided(Mechanic mechanic, MechanicDto dto) {
    if (dto.getServiceIds() == null) {
      return;
    }
    mechanic.setServices(new HashSet<>(serviceRepository.findAllById(dto.getServiceIds())));
  }

  @Override
  public List<MechanicDto> getAllMechanics() {
    return repository.findAll().stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public MechanicDto getMechanicById(Long id) {
    return repository.findById(id)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  @Transactional
  public MechanicDto createMechanic(MechanicDto mechanicDto) {
    Mechanic mechanic = mapper.toEntity(mechanicDto);
    mechanic.setId(null);
    setServicesIfProvided(mechanic, mechanicDto);
    Mechanic saved = repository.save(mechanic);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public MechanicDto updateMechanic(Long id, MechanicDto mechanicDto) {
    Mechanic existing = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Mechanic not found with id: " + id));

    existing.setFirstName(mechanicDto.getFirstName());
    existing.setLastName(mechanicDto.getLastName());
    existing.setHireDate(mechanicDto.getHireDate());
    existing.setPhone(mechanicDto.getPhone());
    setServicesIfProvided(existing, mechanicDto);

    Mechanic updated = repository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteMechanic(Long id) {
    repository.deleteById(id);
  }
}