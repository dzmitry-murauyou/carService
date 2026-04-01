package com.example.carservice.service.impl.cache;

import java.util.Objects;
import lombok.Getter;

@Getter
public class CarSearchFilter {

  private final String brand;
  private final String model;
  private final String clientFirstName;
  private final String clientLastName;
  private final Integer yearFrom;
  private final Integer yearTo;

  public CarSearchFilter(
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer yearFrom,
      Integer yearTo
  ) {
    this.brand = normalize(brand);
    this.model = normalize(model);
    this.clientFirstName = normalize(clientFirstName);
    this.clientLastName = normalize(clientLastName);
    this.yearFrom = yearFrom;
    this.yearTo = yearTo;
  }

  private String normalize(String value) {
    return value == null ? "" : value.trim().toLowerCase();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof CarSearchFilter that)) return false;
    return Objects.equals(brand, that.brand)
        && Objects.equals(model, that.model)
        && Objects.equals(clientFirstName, that.clientFirstName)
        && Objects.equals(clientLastName, that.clientLastName)
        && Objects.equals(yearFrom, that.yearFrom)
        && Objects.equals(yearTo, that.yearTo);
  }

  @Override
  public int hashCode() {
    return Objects.hash(brand, model, clientFirstName, clientLastName, yearFrom, yearTo);
  }
}