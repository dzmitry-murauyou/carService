package com.example.carservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "car_brand_model")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CarBrandModel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 40)
  private String brand;

  @Column(nullable = false, length = 40)
  private String model;

  @OneToMany(mappedBy = "brandModel")
  private List<Car> cars;

  public String getFullName() {
    return brand + " " + model;
  }
}