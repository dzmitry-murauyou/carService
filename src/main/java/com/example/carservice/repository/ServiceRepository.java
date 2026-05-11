package com.example.carservice.repository;

import com.example.carservice.model.ServiceEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {

  List<ServiceEntity> findByCategoryName(String name);

  List<ServiceEntity> findByPriceLessThan(Double price);

  List<ServiceEntity> findByCategoryNameAndAvailable(String name, Boolean available);

  @Query("SELECT s FROM ServiceEntity s "
      + "WHERE s.price > :minPrice AND s.category.name = :categoryName")
  List<ServiceEntity> findExpensiveServicesByCategory(
      @Param("minPrice") Double minPrice,
      @Param("categoryName") String categoryName
  );

  @Query(value = "SELECT * FROM services WHERE duration_minutes < :maxDuration",
      nativeQuery = true)
  List<ServiceEntity> findShortServices(@Param("maxDuration") Integer maxDuration);


}