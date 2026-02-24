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
        .name(entity.getName())
        .description(entity.getDescription())
        .price(entity.getPrice())
        .duration(formatDuration(entity.getDurationMinutes()))
        .category(entity.getCategory())
        .status(entity.getAvailable() ? "Доступно" : "Недоступно")
        .masterName(entity.getMasterName())
        .note(entity.getNote())
        .build();
  }

  private String formatDuration(Integer minutes) {
    if (minutes == null) {
      return "Не указано";
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
}