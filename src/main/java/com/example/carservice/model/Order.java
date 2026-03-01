package com.example.carservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "order_date")
  private LocalDateTime orderDate;

  private String status;

  @Column(name = "total_price")
  private Double totalPrice;

  private String description;

  @Column(name = "completion_date")
  private LocalDateTime completionDate;

  @ManyToOne
  @JoinColumn(name = "car_id")
  private Car car;

  @ManyToOne
  @JoinColumn(name = "mechanic_id")
  private Mechanic mechanic;

  @ManyToMany
  @JoinTable(
      name = "order_services",
      joinColumns = @JoinColumn(name = "order_id"),
      inverseJoinColumns = @JoinColumn(name = "service_id")
  )
  private Set<ServiceEntity> services = new HashSet<>();  // List → Set

  @ManyToMany
  @JoinTable(
      name = "order_spares",
      joinColumns = @JoinColumn(name = "order_id"),
      inverseJoinColumns = @JoinColumn(name = "spare_id")
  )
  private Set<Spare> spares = new HashSet<>();  // List → Set
}