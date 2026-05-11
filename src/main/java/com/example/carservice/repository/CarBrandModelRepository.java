package com.example.carservice.repository;

import com.example.carservice.model.CarBrandModel;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarBrandModelRepository extends JpaRepository<CarBrandModel, Long> {

  Optional<CarBrandModel> findByBrandAndModel(String brand, String model);

}