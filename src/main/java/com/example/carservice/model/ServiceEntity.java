package com.example.carservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "services")
@Data
@EqualsAndHashCode(exclude = {"category", "orders", "mechanics"})
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 140)
  private String name;

  @Column(length = 255)
  private String description;

  @Column(nullable = false)
  private Double price;

  @Column(name = "duration_minutes")
  private Integer durationMinutes;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @ToString.Exclude
  @JsonIgnore
  private ServiceCategory category;

  private Boolean available;

  @Column(name = "master_name", length = 80)
  private String masterName;

  @Column(length = 255)
  private String note;

  @ManyToMany(mappedBy = "services")
  @ToString.Exclude
  @JsonIgnore
  private List<Order> orders;

  @ManyToMany(mappedBy = "services")
  @Builder.Default
  @ToString.Exclude
  @JsonIgnore
  private Set<Mechanic> mechanics = new HashSet<>();
}