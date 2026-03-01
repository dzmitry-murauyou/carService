package com.example.carservice.repository;

import com.example.carservice.model.Car;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

  List<Car> findByClientId(Long clientId);

  Optional<Car> findByLicensePlate(String licensePlate);

  Optional<Car> findByVin(String vin);

  List<Car> findByBrandAndModel(String brand, String model);

  List<Car> findByYear(Integer year);
}