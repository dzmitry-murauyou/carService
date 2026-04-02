package com.example.carservice.service.impl.cache;

import com.example.carservice.dto.CarDto;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CarSearchCache {

  private final Map<CarSearchCacheKey, Page<CarDto>> cache = new ConcurrentHashMap<>();

  public Page<CarDto> get(CarSearchCacheKey key) {
    return cache.get(key);
  }

  public void put(CarSearchCacheKey key, Page<CarDto> value) {
    cache.put(key, value);
  }

  public void invalidateAll() {
    log.info("Car search cache invalidated. Evicted {} entries.", cache.size());
    cache.clear();
  }
}