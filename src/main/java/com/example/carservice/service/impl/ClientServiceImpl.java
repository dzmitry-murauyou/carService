package com.example.carservice.service.impl;

import com.example.carservice.dto.CarDto;
import com.example.carservice.dto.ClientDto;
import com.example.carservice.dto.mapper.ClientMapper;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.exception.TransactionDemoException;
import com.example.carservice.model.Car;
import com.example.carservice.model.CarBrandModel;
import com.example.carservice.model.Client;
import com.example.carservice.repository.CarBrandModelRepository;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.service.ClientService;
import com.example.carservice.service.impl.cache.CarSearchCache;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

  private final ClientRepository clientRepository;
  private final CarRepository carRepository;
  private final CarBrandModelRepository carBrandModelRepository;
  private final ClientMapper mapper;
  private final CarSearchCache carSearchCache;

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
        .orElseThrow(() -> new ResourceNotFoundException(
            "Client not found with id: " + id));
  }

  @Override
  public ClientDto getClientByPhone(String phone) {
    return clientRepository.findByPhone(phone)
        .map(mapper::toDto)
        .orElseThrow(() -> new ResourceNotFoundException(
            "Client not found with phone: " + phone));
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
    carSearchCache.invalidateAll();
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public ClientDto updateClient(Long id, ClientDto clientDto) {
    Client existing = clientRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(
            "Client not found with id: " + id));

    existing.setFirstName(clientDto.getFirstName());
    existing.setLastName(clientDto.getLastName());
    existing.setPhone(clientDto.getPhone());
    existing.setEmail(clientDto.getEmail());
    existing.setAddress(clientDto.getAddress());
    existing.setRegistrationDate(clientDto.getRegistrationDate());

    Client updated = clientRepository.save(existing);
    carSearchCache.invalidateAll();
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteClient(Long id) {
    Client client = clientRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Client not found"));

    for (Car car : client.getCars()) {
      car.setClient(null);
      carRepository.save(car);
    }

    clientRepository.delete(client);
    carSearchCache.invalidateAll();
  }

  @Override
  public void createClientWithNewCarsWithoutTransaction(ClientDto clientDto) {
    Client savedClient = saveClient(clientDto);
    processCars(clientDto, savedClient, false);
  }

  @Override
  @Transactional
  public void createClientWithNewCarsWithTransaction(ClientDto clientDto) {
    Client savedClient = saveClient(clientDto);
    processCars(clientDto, savedClient, true);
  }

  private Client saveClient(ClientDto clientDto) {
    Client client = mapper.toEntity(clientDto);
    client.setId(null);
    Client savedClient = clientRepository.save(client);
    log.info("Клиент сохранен с ID: {}", savedClient.getId());
    return savedClient;
  }

  private void processCars(
      ClientDto clientDto,
      Client savedClient,
      boolean isTransactional
  ) {
    if (clientDto.getCars() == null || clientDto.getCars().isEmpty()) {
      return;
    }

    for (int i = 0; i < clientDto.getCars().size(); i++) {
      CarDto carDto = clientDto.getCars().get(i);

      if (i == 1) {
        String errorMessage = isTransactional
            ? "Ошибка при сохранении машины #2 - полный откат!"
            : "Ошибка при сохранении машины #2";
        log.error("Имитация ошибки при сохранении 2-й машины!");
        throw new TransactionDemoException(errorMessage);
      }

      Car car = buildCar(carDto, savedClient);
      Car savedCar = carRepository.save(car);

      String transactionSuffix = isTransactional ? " (в транзакции)" : "";
      log.info("Машина {} сохранена с ID: {}, госномер: {}{}",
          (i + 1), savedCar.getId(), savedCar.getLicensePlate(),
          transactionSuffix);
    }
  }

  private Car buildCar(CarDto carDto, Client savedClient) {
    CarBrandModel brandModel = carBrandModelRepository
        .findById(carDto.getBrandModelId())
        .orElseThrow(() -> new TransactionDemoException(
            "CarBrandModel не найден с ID: " + carDto.getBrandModelId()));

    Car car = new Car();
    car.setBrandModel(brandModel);
    car.setLicensePlate(carDto.getLicensePlate());
    car.setVin(carDto.getVin());
    car.setYear(carDto.getYear());
    car.setClient(savedClient);

    return car;
  }
}