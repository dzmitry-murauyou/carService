package com.example.carservice.service;

import com.example.carservice.dto.CarDto;
import com.example.carservice.service.impl.cache.CarSearchFilter;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CarService {

  List<CarDto> getAllCars();

  CarDto getCarById(Long id);

  List<CarDto> getCarsByClient(Long clientId);

  Page<CarDto> searchCarsJpql(CarSearchFilter filter, Pageable pageable);

  Page<CarDto> searchCarsNative(CarSearchFilter filter, Pageable pageable);

  CarDto createCar(CarDto carDto);

  CarDto updateCar(Long id, CarDto carDto);

  void deleteCar(Long id);
}