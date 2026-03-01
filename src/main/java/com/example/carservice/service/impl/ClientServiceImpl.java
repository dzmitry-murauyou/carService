package com.example.carservice.service.impl;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.dto.mapper.ClientMapper;
import com.example.carservice.model.Client;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.service.ClientService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

  private final ClientRepository repository;
  private final ClientMapper mapper;

  @Override
  public List<ClientDto> getAllClients() {
    return repository.findAll().stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public ClientDto getClientById(Long id) {
    return repository.findById(id)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  @Transactional
  public ClientDto createClient(ClientDto clientDto) {
    Client entity = mapper.toEntity(clientDto);
    entity.setId(null);
    Client saved = repository.save(entity);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public ClientDto updateClient(Long id, ClientDto clientDto) {
    Client existing = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Client not found with id: " + id));

    existing.setFirstName(clientDto.getFirstName());
    existing.setLastName(clientDto.getLastName());
    existing.setPhone(clientDto.getPhone());
    existing.setEmail(clientDto.getEmail());
    existing.setAddress(clientDto.getAddress());
    existing.setRegistrationDate(clientDto.getRegistrationDate());

    Client updated = repository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteClient(Long id) {
    repository.deleteById(id);
  }
}