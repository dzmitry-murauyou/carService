package com.example.carservice.repository;

import com.example.carservice.model.Spare;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpareRepository extends JpaRepository<Spare, Long> {

  Optional<Spare> findByPartNumber(String partNumber);

  List<Spare> findByNameContainingIgnoreCase(String name);

  List<Spare> findByManufacturer(String manufacturer);

  List<Spare> findByQuantityInStockLessThan(Integer minQuantity);
}