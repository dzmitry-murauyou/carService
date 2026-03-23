package com.example.carservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "mechanics")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"services"})
public class Mechanic {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 40)
  private String firstName;

  @Column(nullable = false, length = 40)
  private String lastName;

  @Column(length = 13)
  private String phone;

  @Column(name = "hire_date")
  private LocalDate hireDate;

  @ManyToMany
  @JoinTable(
      name = "mechanic_services",
      joinColumns = @JoinColumn(name = "mechanic_id"),
      inverseJoinColumns = @JoinColumn(name = "service_id")
  )
  @Builder.Default
  private Set<ServiceEntity> services = new HashSet<>();
}