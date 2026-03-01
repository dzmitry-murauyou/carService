package com.example.carservice.dto.mapper;

import com.example.carservice.dto.CarDto;
import com.example.carservice.model.Car;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {

  public CarDto toDto(Car entity) {
    if (entity == null) {
      return null;
    }

    return CarDto.builder()
        .id(entity.getId())
        .brand(entity.getBrand())
        .model(entity.getModel())
        .year(entity.getYear())
        .licensePlate(entity.getLicensePlate())
        .vin(entity.getVin())
        .clientId(entity.getClient() != null ? entity.getClient().getId() : null)
        .clientName(entity.getClient() != null
            ? entity.getClient().getFirstName() + " " + entity.getClient().getLastName()
            : null)
        .build();
  }

  public Car toEntity(CarDto dto) {
    if (dto == null) {
      return null;
    }

    return Car.builder()
        .id(dto.getId())
        .brand(dto.getBrand())
        .model(dto.getModel())
        .year(dto.getYear())
        .licensePlate(dto.getLicensePlate())
        .vin(dto.getVin())
        .build();
  }
}