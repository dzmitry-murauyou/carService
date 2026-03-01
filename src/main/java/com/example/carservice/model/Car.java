package com.example.carservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cars")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Car {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String brand;

  @Column(nullable = false)
  private String model;

  private Integer year;

  @Column(name = "license_plate", unique = true, nullable = false)
  private String licensePlate;

  @Column(unique = true)
  private String vin;

  @ManyToOne
  @JoinColumn(name = "client_id", nullable = false)
  private Client client;

  @OneToMany(mappedBy = "car")
  private List<Order> orders;
}