package com.example.carservice.controller;

import com.example.carservice.dto.CarDto;
import com.example.carservice.service.CarService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

  private final CarService carService;

  @GetMapping
  public List<CarDto> getAllCars() {
    return carService.getAllCars();
  }

  @GetMapping("/{id}")
  public CarDto getCarById(@PathVariable Long id) {
    return carService.getCarById(id);
  }

  @GetMapping("/client/{clientId}")
  public List<CarDto> getCarsByClient(@PathVariable Long clientId) {
    return carService.getCarsByClient(clientId);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public CarDto createCar(@RequestBody CarDto carDto) {
    return carService.createCar(carDto);
  }

  @PutMapping("/{id}")
  public CarDto updateCar(@PathVariable Long id, @RequestBody CarDto carDto) {
    return carService.updateCar(id, carDto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCar(@PathVariable Long id) {
    carService.deleteCar(id);
  }
}