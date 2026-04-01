package com.example.carservice.service.impl.cache;

import java.util.Objects;
import lombok.Getter;

@Getter
public final class CarSearchCacheKey {

  private final String searchType;
  private final String brand;
  private final String model;
  private final String clientFirstName;
  private final String clientLastName;
  private final Integer yearFrom;
  private final Integer yearTo;
  private final int page;
  private final int size;
  private final String sort;

  public CarSearchCacheKey(
      String searchType,
      String brand,
      String model,
      String clientFirstName,
      String clientLastName,
      Integer yearFrom,
      Integer yearTo,
      int page,
      int size,
      String sort
  ) {
    this.searchType = searchType;
    this.brand = normalize(brand);
    this.model = normalize(model);
    this.clientFirstName = normalize(clientFirstName);
    this.clientLastName = normalize(clientLastName);
    this.yearFrom = yearFrom;
    this.yearTo = yearTo;
    this.page = page;
    this.size = size;
    this.sort = normalize(sort);
  }

  private String normalize(String value) {
    return value == null ? "" : value.trim().toLowerCase();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof CarSearchCacheKey that)) return false;
    return page == that.page
        && size == that.size
        && Objects.equals(searchType, that.searchType)
        && Objects.equals(brand, that.brand)
        && Objects.equals(model, that.model)
        && Objects.equals(clientFirstName, that.clientFirstName)
        && Objects.equals(clientLastName, that.clientLastName)
        && Objects.equals(yearFrom, that.yearFrom)
        && Objects.equals(yearTo, that.yearTo)
        && Objects.equals(sort, that.sort);
  }

  @Override
  public int hashCode() {
    return Objects.hash(
        searchType,
        brand,
        model,
        clientFirstName,
        clientLastName,
        yearFrom,
        yearTo,
        page,
        size,
        sort
    );
  }
}