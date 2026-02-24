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
        dto.setStatus(getStatusText(entity.getAvailable()));
        dto.setMasterName(entity.getMasterName());
        dto.setNote(entity.getNote());

        return dto;
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

    private String getStatusText(boolean available) {
        if (available) {
            return "Доступно";
        }
        return "Недоступно";
    }
}