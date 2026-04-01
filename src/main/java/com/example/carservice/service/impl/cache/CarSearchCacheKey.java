package com.example.carservice.service.impl.cache;

import java.util.Objects;
import lombok.Getter;

@Getter
public final class CarSearchCacheKey {

  private final String searchType;
  private final CarSearchFilter filter;
  private final int page;
  private final int size;
  private final String sort;

  public CarSearchCacheKey(
      String searchType,
      CarSearchFilter filter,
      int page,
      int size,
      String sort
  ) {
    this.searchType = normalize(searchType);
    this.filter = filter;
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
        && Objects.equals(filter, that.filter)
        && Objects.equals(sort, that.sort);
  }

  @Override
  public int hashCode() {
    return Objects.hash(searchType, filter, page, size, sort);
  }
}