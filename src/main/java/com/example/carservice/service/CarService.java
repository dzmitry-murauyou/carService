package com.example.carservice.service;

import com.example.carservice.dto.CarDto;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CarService {

  List<CarDto> getAllCars();

  CarDto getCarById(Long id);

  List<CarDto> getCarsByClient(Long clientId);

  Page<CarDto> searchCarsJpql(
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer yearFrom,
      Integer yearTo,
      Pageable pageable
  );

  Page<CarDto> searchCarsNative(
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer yearFrom,
      Integer yearTo,
      Pageable pageable
  );

  CarDto createCar(CarDto carDto);

  CarDto updateCar(Long id, CarDto carDto);

  void deleteCar(Long id);
}

