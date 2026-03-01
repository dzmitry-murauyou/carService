package com.example.carservice.dto.mapper;

import com.example.carservice.dto.SpareDto;
import com.example.carservice.model.Spare;
import org.springframework.stereotype.Component;

@Component
public class SpareMapper {

  public SpareDto toDto(Spare entity) {
    if (entity == null) {
      return null;
    }

    return SpareDto.builder()
        .id(entity.getId())
        .name(entity.getName())
        .partNumber(entity.getPartNumber())
        .price(entity.getPrice())
        .quantityInStock(entity.getQuantityInStock())
        .manufacturer(entity.getManufacturer())
        .build();
  }

  public Spare toEntity(SpareDto dto) {
    if (dto == null) {
      return null;
    }

    return Spare.builder()
        .id(dto.getId())
        .name(dto.getName())
        .partNumber(dto.getPartNumber())
        .price(dto.getPrice())
        .quantityInStock(dto.getQuantityInStock())
        .manufacturer(dto.getManufacturer())
        .build();
  }
}