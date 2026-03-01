package com.example.carservice.service;

import com.example.carservice.dto.ClientDto;
import java.util.List;

public interface ClientService {

  List<ClientDto> getAllClients();

  ClientDto getClientById(Long id);

  ClientDto createClient(ClientDto clientDto);

  ClientDto updateClient(Long id, ClientDto clientDto);

  void deleteClient(Long id);
}