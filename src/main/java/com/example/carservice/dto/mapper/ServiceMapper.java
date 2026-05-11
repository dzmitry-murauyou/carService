package com.example.carservice.dto.mapper;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.model.ServiceEntity;
import org.springframework.stereotype.Component;

@Component
public class ServiceMapper {

  public ServiceDto toDto(ServiceEntity entity) {
    if (entity == null) {
      return null;
    }

    return ServiceDto.builder()
        .id(entity.getId())
        .name(entity.getName())
        .description(entity.getDescription())
        .price(entity.getPrice())
        .duration(formatDuration(entity.getDurationMinutes()))
        .status(entity.getAvailable() != null && entity.getAvailable() ? "active" : "inactive")
        .build();
  }

  public ServiceEntity toEntity(ServiceDto dto) {
    if (dto == null) {
      return null;
    }

    ServiceEntity entity = new ServiceEntity();
    entity.setId(dto.getId());
    entity.setName(dto.getName());
    entity.setDescription(dto.getDescription());
    entity.setPrice(dto.getPrice());
    entity.setDurationMinutes(parseDuration(dto.getDuration()));
    entity.setAvailable(dto.getStatus() == null || !"inactive".equals(dto.getStatus()));
    return entity;
  }

  private String formatDuration(Integer minutes) {
    if (minutes == null || minutes == 0) {
      return "";
    }
    if (minutes < 60) {
      return minutes + " мин";
    }
    int hours = minutes / 60;
    int remainingMinutes = minutes % 60;
    if (remainingMinutes == 0) {
      return hours + " ч";
    }
    return hours + " ч " + remainingMinutes + " мин";
  }

  public Integer parseDuration(String duration) {
    if (duration == null || duration.trim().isEmpty()) {
      return null;
    }
    try {
      String digits = duration.replaceAll("\\D+", "");
      return digits.isEmpty() ? null : Integer.parseInt(digits);
    } catch (NumberFormatException e) {
      return null;
    }
  }
}