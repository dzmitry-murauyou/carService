package com.example.carservice.controller;

import com.example.carservice.dto.CarDto;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.CarService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
public class CarController {

  private final CarService carService;

  @GetMapping
  public ResponseEntity<List<CarDto>> getAllCars() {
    return ResponseEntity.ok(carService.getAllCars());
  }

  @GetMapping("/{id}")
  public ResponseEntity<CarDto> getCarById(@PathVariable Long id) {
    CarDto car = carService.getCarById(id);
    if (car == null) {
      throw new ResourceNotFoundException("Car not found with id: " + id);
    }
    return ResponseEntity.ok(car);
  }

  @GetMapping("/client/{clientId}")
  public ResponseEntity<List<CarDto>> getCarsByClient(@PathVariable Long clientId) {
    return ResponseEntity.ok(carService.getCarsByClient(clientId));
  }

  // ✅ JPQL search
  @GetMapping("/search/jpql")
  public ResponseEntity<Page<CarDto>> searchCarsJpql(
      @RequestParam(required = false) String brand,
      @RequestParam(required = false) String model,
      @RequestParam(required = false) String clientFirstName,
      @RequestParam(required = false) String clientLastName,
      @RequestParam(required = false) Integer yearFrom,
      @RequestParam(required = false) Integer yearTo,
      Pageable pageable
  ) {
    return ResponseEntity.ok(
        carService.searchCarsJpql(
            brand,
            model,
            clientFirstName,
            clientLastName,
            yearFrom,
            yearTo,
            pageable
        )
    );
  }

  // ✅ Native search
  @GetMapping("/search/native")
  public ResponseEntity<Page<CarDto>> searchCarsNative(
      @RequestParam(required = false) String brand,
      @RequestParam(required = false) String model,
      @RequestParam(required = false) String clientFirstName,
      @RequestParam(required = false) String clientLastName,
      @RequestParam(required = false) Integer yearFrom,
      @RequestParam(required = false) Integer yearTo,
      Pageable pageable
  ) {
    return ResponseEntity.ok(
        carService.searchCarsNative(
            brand,
            model,
            clientFirstName,
            clientLastName,
            yearFrom,
            yearTo,
            pageable
        )
    );
  }

  @PostMapping
  public ResponseEntity<CarDto> createCar(@RequestBody CarDto carDto) {
    CarDto created = carService.createCar(carDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<CarDto> updateCar(
      @PathVariable Long id,
      @RequestBody CarDto carDto
  ) {
    CarDto updated = carService.updateCar(id, carDto);
    if (updated == null) {
      throw new ResourceNotFoundException("Car not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    carService.deleteCar(id);
    return ResponseEntity.noContent().build();
  }
}