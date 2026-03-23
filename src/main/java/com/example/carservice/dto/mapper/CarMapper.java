package com.example.carservice.dto.mapper;

import com.example.carservice.dto.CarDto;
import com.example.carservice.model.Car;
import com.example.carservice.model.CarBrandModel;
import com.example.carservice.repository.CarBrandModelRepository;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {

  private final CarBrandModelRepository brandModelRepository;

  public CarMapper(CarBrandModelRepository brandModelRepository) {
    this.brandModelRepository = brandModelRepository;
  }

  public CarDto toDto(Car entity) {
    if (entity == null) {
      return null;
    }

    return CarDto.builder()
        .id(entity.getId())
        .brandModelId(entity.getBrandModel() != null ? entity.getBrandModel().getId() : null)
        .brand(entity.getBrand())
        .model(entity.getModel())
        .licensePlate(entity.getLicensePlate())
        .vin(entity.getVin())
        .year(entity.getYear())
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

    Car.CarBuilder builder = Car.builder()
        .id(dto.getId())
        .licensePlate(dto.getLicensePlate())
        .vin(dto.getVin())
        .year(dto.getYear());

    if (dto.getBrandModelId() != null) {
      CarBrandModel brandModel = brandModelRepository.findById(dto.getBrandModelId())
          .orElseThrow(() -> new RuntimeException("BrandModel not found"));
      builder.brandModel(brandModel);
    }

    return builder.build();
  }
}