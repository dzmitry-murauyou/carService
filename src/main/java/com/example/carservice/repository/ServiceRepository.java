package com.example.carservice.repository;

import com.example.carservice.model.ServiceEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {

  List<ServiceEntity> findByCategory(String category);

  List<ServiceEntity> findByPriceLessThan(Double price);

  List<ServiceEntity> findByCategoryAndAvailable(String category, Boolean available);

  @Query("SELECT s FROM ServiceEntity s WHERE s.price > :minPrice AND s.category = :category")
  List<ServiceEntity> findExpensiveServicesByCategory(
      @Param("minPrice") Double minPrice,
      @Param("category") String category);

  @Query(value = "SELECT * FROM service_entity WHERE duration_minutes < :maxDuration",
      nativeQuery = true)
  List<ServiceEntity> findShortServices(@Param("maxDuration") Integer maxDuration);
}