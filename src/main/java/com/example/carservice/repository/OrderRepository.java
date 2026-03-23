package com.example.carservice.repository;

import com.example.carservice.model.Order;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

  List<Order> findByCarId(Long carId);

  @Query("SELECT o FROM Order o WHERE o.car.client.id = :clientId")

  List<Order> findByClientId(@Param("clientId") Long clientId);

  List<Order> findByStatus(String status);

  List<Order> findByOrderDateBetween(LocalDateTime start, LocalDateTime end);

  List<Order> findAll();

  @EntityGraph(attributePaths = {"car", "services", "spares"})
  @Query("SELECT o FROM Order o")
  List<Order> findAllWithDetails();
}