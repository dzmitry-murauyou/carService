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

        ServiceDto dto = new ServiceDto();
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setPrice(entity.getPrice());
        dto.setDuration(formatDuration(entity.getDurationMinutes()));
        dto.setCategory(entity.getCategory());

        if (entity.getAvailable()) {
            dto.setStatus("Доступно");
        } else {
            dto.setStatus("Недоступно");
        }

        dto.setMasterName(entity.getMasterName());
        dto.setNote(entity.getNote());

        return dto;
    }

    public ServiceEntity toEntity(ServiceDto dto) {
        if (dto == null) {
            return null;
        }

        ServiceEntity entity = new ServiceEntity();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setDurationMinutes(parseDuration(dto.getDuration()));
        entity.setCategory(dto.getCategory());
        entity.setAvailable("Доступно".equals(dto.getStatus()));
        entity.setMasterName(dto.getMasterName());
        entity.setNote(dto.getNote());

        return entity;
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

    private Integer parseDuration(String duration) {
        if (duration == null || duration.isEmpty()) {
            return 0;
        }
        try {
            if (duration.contains("ч")) {
                String[] parts = duration.split(" ");
                int hours = Integer.parseInt(parts[0]);
                if (parts.length > 2) {
                    int minutes = Integer.parseInt(parts[2]);
                    return hours * 60 + minutes;
                }
                return hours * 60;
            } else if (duration.contains("мин")) {
                return Integer.parseInt(duration.split(" ")[0]);
            }
        } catch (Exception e) {
            return 0;
        }
        return 0;
    }
}