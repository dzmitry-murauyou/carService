package com.example.carservice.dto.mapper;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.model.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper {

  public ClientDto toDto(Client entity) {
    if (entity == null) {
      return null;
    }

    return ClientDto.builder()
        .id(entity.getId())
        .firstName(entity.getFirstName())
        .lastName(entity.getLastName())
        .phone(entity.getPhone())
        .email(entity.getEmail())
        .address(entity.getAddress())
        .registrationDate(entity.getRegistrationDate())
        .build();
  }

  public Client toEntity(ClientDto dto) {
    if (dto == null) {
      return null;
    }

    return Client.builder()
        .id(dto.getId())
        .firstName(dto.getFirstName())
        .lastName(dto.getLastName())
        .phone(dto.getPhone())
        .email(dto.getEmail())
        .address(dto.getAddress())
        .registrationDate(dto.getRegistrationDate())
        .build();
  }
}