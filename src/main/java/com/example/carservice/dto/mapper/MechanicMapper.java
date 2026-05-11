package com.example.carservice.dto.mapper;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.model.Mechanic;
import com.example.carservice.model.ServiceEntity;
import java.util.stream.Collectors;
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
        .hireDate(entity.getHireDate())
        .phone(entity.getPhone())
        .serviceIds(entity.getServices() == null ? null : entity.getServices().stream()
            .map(ServiceEntity::getId)
            .collect(Collectors.toSet()))
        .serviceNames(entity.getServices() == null ? null : entity.getServices().stream()
            .map(ServiceEntity::getName)
            .collect(Collectors.toSet()))
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
        .hireDate(dto.getHireDate())
        .phone(dto.getPhone())
        .build();
  }
}