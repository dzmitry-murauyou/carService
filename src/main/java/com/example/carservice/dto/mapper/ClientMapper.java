package com.example.carservice.dto.mapper;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.model.Client;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ClientMapper {

  private final CarMapper carMapper;

  public ClientDto toDto(Client client) {
    if (client == null) {
      return null;
    }

    ClientDto dto = new ClientDto();
    dto.setId(client.getId());
    dto.setFirstName(client.getFirstName());
    dto.setLastName(client.getLastName());
    dto.setPhone(client.getPhone());
    dto.setEmail(client.getEmail());
    dto.setAddress(client.getAddress());
    dto.setRegistrationDate(client.getRegistrationDate());

    if (client.getCars() != null && !client.getCars().isEmpty()) {
      dto.setCars(client.getCars().stream()
          .map(carMapper::toDto)
          .toList());
    }

    return dto;
  }

  public Client toEntity(ClientDto dto) {
    if (dto == null) {
      return null;
    }

    Client client = new Client();
    client.setId(dto.getId());
    client.setFirstName(dto.getFirstName());
    client.setLastName(dto.getLastName());
    client.setPhone(dto.getPhone());
    client.setEmail(dto.getEmail());
    client.setAddress(dto.getAddress());
    client.setRegistrationDate(dto.getRegistrationDate());

    return client;
  }
}