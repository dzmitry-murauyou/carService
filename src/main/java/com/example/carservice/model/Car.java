package com.example.carservice.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
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

  @ManyToOne
  @JoinColumn(name = "brand_model_id", nullable = false)
  private CarBrandModel brandModel;

  @Column(name = "license_plate", nullable = false, unique = true, length = 8)
  private String licensePlate;

  @Column(unique = true, length = 17)
  private String vin;

  private Integer year;

  @ManyToOne
  @JoinColumn(name = "client_id")
  private Client client;

  @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Order> orders = new ArrayList<>();

  public String getFullName() {
    return brandModel != null ? brandModel.getFullName() : null;
  }

  public String getBrand() {
    return brandModel != null ? brandModel.getBrand() : null;
  }

  public String getModel() {
    return brandModel != null ? brandModel.getModel() : null;
  }
}