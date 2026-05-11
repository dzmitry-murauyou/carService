package com.example.carservice.dto.mapper;

import com.example.carservice.dto.CarDto;
import com.example.carservice.model.Car;
import org.springframework.stereotype.Component;

@Component
public class CarMapper {

  public CarDto toDto(Car car) {
    if (car == null) {
      return null;
    }

    CarDto dto = new CarDto();
    dto.setId(car.getId());
    if (car.getBrandModel() != null) {
      dto.setBrand(car.getBrandModel().getBrand());
      dto.setModel(car.getBrandModel().getModel());
    }

    dto.setLicensePlate(car.getLicensePlate());
    dto.setVin(car.getVin());
    dto.setYear(car.getYear());

    if (car.getClient() != null) {
      dto.setClientId(car.getClient().getId());
      dto.setClientName(car.getClient().getFirstName() + " " + car.getClient().getLastName());
    }

    return dto;
  }

  public Car toEntity(CarDto dto) {
    if (dto == null) {
      return null;
    }

    Car car = new Car();

    car.setLicensePlate(dto.getLicensePlate());
    car.setVin(dto.getVin());
    car.setYear(dto.getYear());

    return car;
  }
}