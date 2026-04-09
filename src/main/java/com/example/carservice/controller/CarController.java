package com.example.carservice.controller;

import com.example.carservice.dto.CarDto;
import com.example.carservice.exception.ApiError;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.CarService;
import com.example.carservice.service.impl.cache.CarSearchFilter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cars")
@RequiredArgsConstructor
@Tag(name = "Cars", description = "API for managing cars")
public class CarController {

  private final CarService carService;

  @Operation(summary = "Get all cars")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping
  public ResponseEntity<List<CarDto>> getAllCars() {
    return ResponseEntity.ok(carService.getAllCars());
  }

  @Operation(summary = "Get car by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "404",
          description = "Car not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping("/{id}")
  public ResponseEntity<CarDto> getCarById(@PathVariable Long id) {
    CarDto car = carService.getCarById(id);
    if (car == null) {
      throw new ResourceNotFoundException("Car not found with id: " + id);
    }
    return ResponseEntity.ok(car);
  }

  @Operation(summary = "Get cars by client id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping("/client/{clientId}")
  public ResponseEntity<List<CarDto>> getCarsByClient(@PathVariable Long clientId) {
    return ResponseEntity.ok(carService.getCarsByClient(clientId));
  }

  @Operation(summary = "Search cars using JPQL with filters and pagination")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Bad request (invalid parameters)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
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
    CarSearchFilter filter = new CarSearchFilter(
        brand, model, clientFirstName, clientLastName, yearFrom, yearTo
    );
    return ResponseEntity.ok(carService.searchCarsJpql(filter, pageable));
  }

  @Operation(summary = "Search cars using native SQL with filters and pagination")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Bad request (invalid parameters)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
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
    CarSearchFilter filter = new CarSearchFilter(
        brand, model, clientFirstName, clientLastName, yearFrom, yearTo
    );
    return ResponseEntity.ok(carService.searchCarsNative(filter, pageable));
  }

  @Operation(summary = "Create a new car")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Created"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate VIN/licensePlate or other unique constraint)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @PostMapping
  public ResponseEntity<CarDto> createCar(@Valid @RequestBody CarDto carDto) {
    CarDto created = carService.createCar(carDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @Operation(summary = "Update car by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "404",
          description = "Car not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate VIN/licensePlate or other unique constraint)",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @PutMapping("/{id}")
  public ResponseEntity<CarDto> updateCar(
      @PathVariable Long id,
      @Valid @RequestBody CarDto carDto
  ) {
    CarDto updated = carService.updateCar(id, carDto);
    if (updated == null) {
      throw new ResourceNotFoundException("Car not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Delete car by id")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "No Content"),
      @ApiResponse(
          responseCode = "404",
          description = "Car not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
    carService.deleteCar(id);
    return ResponseEntity.noContent().build();
  }
}