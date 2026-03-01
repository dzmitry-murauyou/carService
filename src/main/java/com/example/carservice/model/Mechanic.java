package com.example.carservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mechanics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Mechanic {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  private String specialization;

  @Column(name = "hire_date")
  private LocalDate hireDate;

  private String phone;

  private Double salary;

  @OneToMany(mappedBy = "mechanic")
  private List<Order> orders;
}