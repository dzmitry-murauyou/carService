package com.example.carservice.service.impl;

import com.example.carservice.dto.ClientDto;
import com.example.carservice.dto.mapper.ClientMapper;
import com.example.carservice.exception.ResourceNotFoundException;
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

  private final ClientRepository clientRepository;
  private final ClientMapper mapper;

  @Override
  public List<ClientDto> getAllClients() {
    return clientRepository.findAll().stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public ClientDto getClientById(Long id) {
    return clientRepository.findById(id)
        .map(mapper::toDto)
        .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));
  }

  @Override
  public ClientDto getClientByPhone(String phone) {
    return clientRepository.findByPhone(phone)
        .map(mapper::toDto)
        .orElseThrow(() -> new ResourceNotFoundException("Client not found with phone: " + phone));
  }

  @Override
  public List<ClientDto> getClientsByLastName(String lastName) {
    return clientRepository.findByLastName(lastName).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public ClientDto createClient(ClientDto clientDto) {
    Client client = mapper.toEntity(clientDto);
    client.setId(null);
    Client saved = clientRepository.save(client);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public ClientDto updateClient(Long id, ClientDto clientDto) {
    Client existing = clientRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));

    existing.setFirstName(clientDto.getFirstName());
    existing.setLastName(clientDto.getLastName());
    existing.setPhone(clientDto.getPhone());
    existing.setEmail(clientDto.getEmail());
    existing.setAddress(clientDto.getAddress());
    existing.setRegistrationDate(clientDto.getRegistrationDate());

    Client updated = clientRepository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteClient(Long id) {
    if (!clientRepository.existsById(id)) {
      throw new ResourceNotFoundException("Client not found with id: " + id);
    }
    clientRepository.deleteById(id);
  }
}