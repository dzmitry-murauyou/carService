package com.example.carservice.repository;

import com.example.carservice.model.Car;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

  List<Car> findByClientId(Long clientId);

  Optional<Car> findByLicensePlate(String licensePlate);

  Optional<Car> findByVin(String vin);

  List<Car> findByBrandAndModel(String brand, String model);

  List<Car> findByYear(Integer year);

  @Query("""
      SELECT c
      FROM Car c
      JOIN c.client cl
      JOIN c.brandModel bm
      WHERE (:brand IS NULL OR LOWER(bm.brand) = LOWER(:brand))
        AND (:model IS NULL OR LOWER(bm.model) = LOWER(:model))
        AND (:clientFirstName IS NULL OR LOWER(cl.firstName) = LOWER(:clientFirstName))
        AND (:clientLastName IS NULL OR LOWER(cl.lastName) = LOWER(:clientLastName))
        AND (:year IS NULL OR c.year = :year)
      """)
  Page<Car> searchCarsJpql(
      @Param("brand") String brand,
      @Param("model") String model,
      @Param("clientFirstName") String clientFirstName,
      @Param("clientLastName") String clientLastName,
      @Param("year") Integer year,
      Pageable pageable
  );

  @Query(
      value = """
          SELECT c.*
          FROM cars c
          JOIN clients cl ON c.client_id = cl.id
          JOIN car_brand_model bm ON c.brand_model_id = bm.id
          WHERE (:brand IS NULL OR LOWER(bm.brand) = LOWER(:brand))
            AND (:model IS NULL OR LOWER(bm.model) = LOWER(:model))
            AND (:clientFirstName IS NULL OR LOWER(cl.first_name) = LOWER(:clientFirstName))
            AND (:clientLastName IS NULL OR LOWER(cl.last_name) = LOWER(:clientLastName))
            AND (:year IS NULL OR c.year = :year)
          """,
      countQuery = """
          SELECT COUNT(*)
          FROM cars c
          JOIN clients cl ON c.client_id = cl.id
          JOIN car_brand_model bm ON c.brand_model_id = bm.id
          WHERE (:brand IS NULL OR LOWER(bm.brand) = LOWER(:brand))
            AND (:model IS NULL OR LOWER(bm.model) = LOWER(:model))
            AND (:clientFirstName IS NULL OR LOWER(cl.first_name) = LOWER(:clientFirstName))
            AND (:clientLastName IS NULL OR LOWER(cl.last_name) = LOWER(:clientLastName))
            AND (:year IS NULL OR c.year = :year)
          """,
      nativeQuery = true
  )
  Page<Car> searchCarsNative(
      @Param("brand") String brand,
      @Param("model") String model,
      @Param("clientFirstName") String clientFirstName,
      @Param("clientLastName") String clientLastName,
      @Param("year") Integer year,
      Pageable pageable
  );
}
