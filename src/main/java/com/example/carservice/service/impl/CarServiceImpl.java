package com.example.carservice.service.impl;

import com.example.carservice.dto.CarDto;
import com.example.carservice.dto.mapper.CarMapper;
import com.example.carservice.model.Car;
import com.example.carservice.model.CarBrandModel;
import com.example.carservice.model.Client;
import com.example.carservice.repository.CarBrandModelRepository;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.service.CarService;
import com.example.carservice.service.impl.cache.CarSearchCacheKey;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

  private final CarRepository carRepository;
  private final CarBrandModelRepository carBrandModelRepository;
  private final ClientRepository clientRepository;
  private final CarMapper mapper;
  private final Map<CarSearchCacheKey, Page<CarDto>> searchCache = new HashMap<>();

  @Override
  public List<CarDto> getAllCars() {
    return carRepository.findAll().stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public CarDto getCarById(Long id) {
    return carRepository.findById(id)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  public List<CarDto> getCarsByClient(Long clientId) {
    return carRepository.findByClientId(clientId).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public Page<CarDto> searchCarsJpql(
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer year,
      Pageable pageable
  ) {
    CarSearchCacheKey key = buildCacheKey(
        "jpql",
        brand,
        model,
        clientFirstName,
        clientLastName,
        year,
        pageable
    );

    Page<CarDto> cached = searchCache.get(key);
    if (cached != null) {
      return cached;
    }

    Page<CarDto> result = carRepository.searchCarsJpql(
            brand,
            model,
            clientFirstName,
            clientLastName,
            year,
            pageable
        )
        .map(mapper::toDto);

    Page<CarDto> snapshot = new PageImpl<>(
        List.copyOf(result.getContent()),
        pageable,
        result.getTotalElements()
    );
    searchCache.put(key, snapshot);
    return snapshot;
  }

  @Override
  public Page<CarDto> searchCarsNative(
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer year,
      Pageable pageable
  ) {
    CarSearchCacheKey key = buildCacheKey(
        "native",
        brand,
        model,
        clientFirstName,
        clientLastName,
        year,
        pageable
    );

    Page<CarDto> cached = searchCache.get(key);
    if (cached != null) {
      return cached;
    }

    Page<CarDto> result = carRepository.searchCarsNative(
            brand,
            model,
            clientFirstName,
            clientLastName,
            year,
            pageable
        )
        .map(mapper::toDto);

    Page<CarDto> snapshot = new PageImpl<>(
        List.copyOf(result.getContent()),
        pageable,
        result.getTotalElements()
    );
    searchCache.put(key, snapshot);
    return snapshot;
  }

  @Override
  @Transactional
  public CarDto createCar(CarDto carDto) {
    CarBrandModel brandModel = carBrandModelRepository
        .findByBrandAndModel(carDto.getBrand(), carDto.getModel())
        .orElseGet(() -> carBrandModelRepository.save(
            CarBrandModel.builder()
                .brand(carDto.getBrand())
                .model(carDto.getModel())
                .build()
        ));

    Car car = mapper.toEntity(carDto);
    car.setBrandModel(brandModel);

    if (carDto.getClientId() != null) {
      Client client = clientRepository.findById(carDto.getClientId())
          .orElseThrow(() -> new RuntimeException("Client not found"));
      car.setClient(client);
    }

    Car saved = carRepository.save(car);
    invalidateSearchCache();
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public CarDto updateCar(Long id, CarDto carDto) {
    Car existing = carRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Car not found"));

    CarBrandModel brandModel = carBrandModelRepository
        .findByBrandAndModel(carDto.getBrand(), carDto.getModel())
        .orElseGet(() -> carBrandModelRepository.save(
            CarBrandModel.builder()
                .brand(carDto.getBrand())
                .model(carDto.getModel())
                .build()
        ));
    existing.setBrandModel(brandModel);

    existing.setLicensePlate(carDto.getLicensePlate());
    existing.setVin(carDto.getVin());
    existing.setYear(carDto.getYear());

    if (carDto.getClientId() != null) {
      Client client = clientRepository.findById(carDto.getClientId())
          .orElseThrow(() -> new RuntimeException("Client not found"));
      existing.setClient(client);
    } else {
      existing.setClient(null);
    }

    Car updated = carRepository.save(existing);
    invalidateSearchCache();
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteCar(Long id) {
    carRepository.deleteById(id);
    invalidateSearchCache();
  }

  private CarSearchCacheKey buildCacheKey(
      String searchType,
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer year,
      Pageable pageable
  ) {
    return new CarSearchCacheKey(
        searchType,
        brand,
        model,
        clientFirstName,
        clientLastName,
        year,
        pageable.getPageNumber(),
        pageable.getPageSize(),
        pageable.getSort().toString()
    );
  }

  private void invalidateSearchCache() {
    searchCache.clear();
  }
}
