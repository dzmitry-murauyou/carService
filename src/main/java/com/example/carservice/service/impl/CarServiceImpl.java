package com.example.carservice.service.impl;

import com.example.carservice.dto.BulkCarCreateRequest;
import com.example.carservice.dto.BulkCarCreateResult;
import com.example.carservice.dto.CarDto;
import com.example.carservice.dto.mapper.CarMapper;
import com.example.carservice.exception.BulkCreateException;
import com.example.carservice.exception.CarNotFoundException;
import com.example.carservice.exception.ClientNotFoundException;
import com.example.carservice.model.Car;
import com.example.carservice.model.CarBrandModel;
import com.example.carservice.model.Client;
import com.example.carservice.repository.CarBrandModelRepository;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.service.CarService;
import com.example.carservice.service.impl.cache.CarSearchCache;
import com.example.carservice.service.impl.cache.CarSearchCacheKey;
import com.example.carservice.service.impl.cache.CarSearchFilter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

  private static final String CLIENT_NOT_FOUND_MSG = "Client not found with id: ";
  private static final String CAR_NOT_FOUND_MSG = "Car not found with id: ";

  private final CarRepository carRepository;
  private final CarBrandModelRepository carBrandModelRepository;
  private final ClientRepository clientRepository;
  private final CarMapper mapper;
  private final CarSearchCache searchCache;

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
  public Page<CarDto> searchCarsJpql(CarSearchFilter filter, Pageable pageable) {
    CarSearchCacheKey key = buildCacheKey("jpql", filter, pageable);

    Page<CarDto> cached = searchCache.get(key);
    if (cached != null) {
      return cached;
    }

    Page<CarDto> result = carRepository.searchCarsJpql(
            filter.getBrand(),
            filter.getModel(),
            filter.getClientFirstName(),
            filter.getClientLastName(),
            filter.getYearFrom(),
            filter.getYearTo(),
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
  public Page<CarDto> searchCarsNative(CarSearchFilter filter, Pageable pageable) {
    CarSearchCacheKey key = buildCacheKey("native", filter, pageable);

    Page<CarDto> cached = searchCache.get(key);
    if (cached != null) {
      return cached;
    }

    Page<CarDto> result = carRepository.searchCarsNativeProjection(
            filter.getBrand(),
            filter.getModel(),
            filter.getClientFirstName(),
            filter.getClientLastName(),
            filter.getYearFrom(),
            filter.getYearTo(),
            pageable
        )
        .map(p -> {
          CarDto dto = new CarDto();
          dto.setId(p.getId());
          dto.setBrand(p.getBrand());
          dto.setModel(p.getModel());
          dto.setLicensePlate(p.getLicensePlate());
          dto.setVin(p.getVin());
          dto.setYear(p.getYear());
          dto.setClientId(p.getClientId());
          dto.setClientName(p.getClientName());
          return dto;
        });

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
          .orElseThrow(() -> new ClientNotFoundException(CLIENT_NOT_FOUND_MSG
              + carDto.getClientId()));
      car.setClient(client);
    }

    Car saved = carRepository.save(car);
    searchCache.invalidateAll();
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public CarDto updateCar(Long id, CarDto carDto) {
    Car existing = carRepository.findById(id)
        .orElseThrow(() -> new CarNotFoundException(CAR_NOT_FOUND_MSG + id));

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
          .orElseThrow(() -> new ClientNotFoundException(CLIENT_NOT_FOUND_MSG
              + carDto.getClientId()));
      existing.setClient(client);
    } else {
      existing.setClient(null);
    }

    Car updated = carRepository.save(existing);
    searchCache.invalidateAll();
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteCar(Long id) {
    carRepository.deleteById(id);
    searchCache.invalidateAll();
  }

  private CarSearchCacheKey buildCacheKey(
      String searchType,
      CarSearchFilter filter,
      Pageable pageable
  ) {
    return new CarSearchCacheKey(
        searchType,
        filter,
        pageable.getPageNumber(),
        pageable.getPageSize(),
        pageable.getSort().toString()
    );
  }

  @Override
  @Transactional
  public BulkCarCreateResult bulkCreateCarsSafe(BulkCarCreateRequest request) {
    log.info("=== BULK CREATE SAFE (с @Transactional) ===");
    return processBulkCreate(request, true);
  }

  @Override
  public BulkCarCreateResult bulkCreateCarsUnsafe(BulkCarCreateRequest request) {
    log.info("=== BULK CREATE UNSAFE (без @Transactional) ===");
    return processBulkCreate(request, false);
  }

  private BulkCarCreateResult processBulkCreate(BulkCarCreateRequest request, boolean isSafe) {
    List<CarDto> carDtos = request.getCars();
    Long clientId = request.getClientId();

    Client client = clientRepository.findById(clientId)
        .orElseThrow(() -> new ClientNotFoundException(CLIENT_NOT_FOUND_MSG + clientId));

    BulkCarCreateResult result = BulkCarCreateResult.builder()
        .totalRequested(carDtos.size())
        .successfullyCreated(0)
        .failed(0)
        .build();

    for (int i = 0; i < carDtos.size(); i++) {
      CarDto carDto = carDtos.get(i);

      try {
        if (i == 9) {
          throw new BulkCreateException("Демо-ошибка на 10-й машине! (индекс " + i + ")");
        }

        CarBrandModel brandModel = carBrandModelRepository
            .findByBrandAndModel(carDto.getBrand(), carDto.getModel())
            .orElseGet(() -> {
              CarBrandModel newModel = CarBrandModel.builder()
                  .brand(carDto.getBrand())
                  .model(carDto.getModel())
                  .build();
              return carBrandModelRepository.save(newModel);
            });

        Car car = mapper.toEntity(carDto);
        car.setBrandModel(brandModel);
        car.setClient(client);

        Car saved = carRepository.save(car);
        CarDto savedDto = mapper.toDto(saved);

        result.addCreatedCar(savedDto);
        log.info("Машина {} сохранена: {} {} (госномер: {})",
            i + 1, carDto.getBrand(), carDto.getModel(), carDto.getLicensePlate());

      } catch (Exception e) {
        log.error("Ошибка при сохранении машины {}: {}", i + 1, e.getMessage());
        result.addError(i, e.getMessage());

        if (isSafe) {
          throw new BulkCreateException("SAFE mode: bulk operation failed at car " + (i + 1)
              + ". Transaction rolled back. No cars were saved.", e);
        }
      }
    }

    if (result.getFailed() == 0) {
      searchCache.invalidateAll();
      log.info("All cars saved successfully! Cache invalidated.");
    }

    String mode = isSafe ? "SAFE" : "UNSAFE";
    log.info("Bulk create [{}] completed. Success: {}, Failed: {}",
        mode, result.getSuccessfullyCreated(), result.getFailed());

    return result;
  }
}