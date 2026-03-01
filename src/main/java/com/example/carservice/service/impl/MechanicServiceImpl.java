package com.example.carservice.service.impl;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.dto.mapper.MechanicMapper;
import com.example.carservice.model.Mechanic;
import com.example.carservice.repository.MechanicRepository;
import com.example.carservice.service.MechanicService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MechanicServiceImpl implements MechanicService {

  private final MechanicRepository repository;
  private final MechanicMapper mapper;

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
  public List<MechanicDto> getMechanicsBySpecialization(String specialization) {
    return repository.findBySpecialization(specialization).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public MechanicDto createMechanic(MechanicDto mechanicDto) {
    Mechanic entity = mapper.toEntity(mechanicDto);
    entity.setId(null);
    Mechanic saved = repository.save(entity);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public MechanicDto updateMechanic(Long id, MechanicDto mechanicDto) {
    Mechanic existing = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Mechanic not found with id: " + id));

    existing.setFirstName(mechanicDto.getFirstName());
    existing.setLastName(mechanicDto.getLastName());
    existing.setSpecialization(mechanicDto.getSpecialization());
    existing.setHireDate(mechanicDto.getHireDate());
    existing.setPhone(mechanicDto.getPhone());
    existing.setSalary(mechanicDto.getSalary());

    Mechanic updated = repository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteMechanic(Long id) {
    repository.deleteById(id);
  }
}