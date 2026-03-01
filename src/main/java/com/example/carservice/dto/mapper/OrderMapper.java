package com.example.carservice.dto.mapper;

import com.example.carservice.dto.OrderDto;
import com.example.carservice.model.Order;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.model.Spare;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

  public OrderDto toDto(Order entity) {
    if (entity == null) {
      return null;
    }

    OrderDto.OrderDtoBuilder builder = OrderDto.builder()
        .id(entity.getId())
        .orderDate(entity.getOrderDate())
        .status(entity.getStatus())
        .totalPrice(entity.getTotalPrice())
        .description(entity.getDescription())
        .completionDate(entity.getCompletionDate());

    if (entity.getCar() != null) {
      builder.carId(entity.getCar().getId());
      builder.carInfo(entity.getCar().getBrand() + " " + entity.getCar().getModel()
          + " (" + entity.getCar().getLicensePlate() + ")");
    }

    if (entity.getMechanic() != null) {
      builder.mechanicId(entity.getMechanic().getId());
      builder.mechanicName(entity.getMechanic().getFirstName() + " "
          + entity.getMechanic().getLastName());
    }

    if (entity.getServices() != null) {
      builder.serviceIds(entity.getServices().stream()
          .map(ServiceEntity::getId)
          .collect(Collectors.toList()));
      builder.serviceNames(entity.getServices().stream()
          .map(ServiceEntity::getName)
          .collect(Collectors.toList()));
    }

    if (entity.getSpares() != null) {
      builder.spareIds(entity.getSpares().stream()
          .map(Spare::getId)
          .collect(Collectors.toList()));
      builder.spareNames(entity.getSpares().stream()
          .map(Spare::getName)
          .collect(Collectors.toList()));
    }

    return builder.build();
  }

  public Order toEntity(OrderDto dto) {
    if (dto == null) {
      return null;
    }

    return Order.builder()
        .id(dto.getId())
        .orderDate(dto.getOrderDate())
        .status(dto.getStatus())
        .totalPrice(dto.getTotalPrice())
        .description(dto.getDescription())
        .completionDate(dto.getCompletionDate())
        .build();
  }
}