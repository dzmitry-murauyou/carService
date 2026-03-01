package com.example.carservice.service;

import com.example.carservice.dto.CarDto;
import java.util.List;

public interface CarService {

  List<CarDto> getAllCars();

  CarDto getCarById(Long id);

  List<CarDto> getCarsByClient(Long clientId);

  CarDto createCar(CarDto carDto);

  CarDto updateCar(Long id, CarDto carDto);

  void deleteCar(Long id);
}