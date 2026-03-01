package com.example.carservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "spares")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Spare {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(name = "part_number", unique = true, nullable = false)
  private String partNumber;

  @Column(nullable = false)
  private Double price;

  @Column(name = "quantity_in_stock")
  private Integer quantityInStock;

  private String manufacturer;

  @ManyToMany(mappedBy = "spares")
  private List<Order> orders;
}