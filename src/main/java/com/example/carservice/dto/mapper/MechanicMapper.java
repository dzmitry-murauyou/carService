package com.example.carservice.dto.mapper;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.model.Mechanic;
import org.springframework.stereotype.Component;

@Component
public class MechanicMapper {

  public MechanicDto toDto(Mechanic entity) {
    if (entity == null) {
      return null;
    }

    return MechanicDto.builder()
        .id(entity.getId())
        .firstName(entity.getFirstName())
        .lastName(entity.getLastName())
        .specialization(entity.getSpecialization())
        .hireDate(entity.getHireDate())
        .phone(entity.getPhone())
        .salary(entity.getSalary())
        .build();
  }

  public Mechanic toEntity(MechanicDto dto) {
    if (dto == null) {
      return null;
    }

    return Mechanic.builder()
        .id(dto.getId())
        .firstName(dto.getFirstName())
        .lastName(dto.getLastName())
        .specialization(dto.getSpecialization())
        .hireDate(dto.getHireDate())
        .phone(dto.getPhone())
        .salary(dto.getSalary())
        .build();
  }
}