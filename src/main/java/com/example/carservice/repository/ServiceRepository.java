package com.example.carservice.repository;

import com.example.carservice.model.ServiceEntity;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Repository;

@Repository
public class ServiceRepository {

  private final Map<Long, ServiceEntity> services = new ConcurrentHashMap<>();
  private final AtomicLong idGenerator = new AtomicLong(1);

  @PostConstruct
  public void init() {
    save(ServiceEntity.builder()
        .name("Замена масла")
        .description("Замена моторного масла и масляного фильтра")
        .price(2500.0)
        .durationMinutes(60)
        .category("ТО")
        .available(true)
        .masterName("Иван Петров")
        .note("Скидка 10%")
        .build()
    );

    save(ServiceEntity.builder()
        .name("Диагностика двигателя")
        .description("Компьютерная диагностика двигателя")
        .price(1500.0)
        .durationMinutes(30)
        .category("Диагностика")
        .available(true)
        .masterName("Петр Сидоров")
        .note("Запись за 2 дня")
        .build()
    );

    save(ServiceEntity.builder()
        .name("Ремонт подвески")
        .description("Замена амортизаторов")
        .price(5000.0)
        .durationMinutes(120)
        .category("Ремонт")
        .available(true)
        .masterName("Алексей Иванов")
        .note("Оригинальные запчасти")
        .build()
    );
  }

  public List<ServiceEntity> findAll() {
    return new ArrayList<>(services.values());
  }

  public ServiceEntity findById(Long id) {
    return services.get(id);
  }

  public ServiceEntity save(ServiceEntity service) {
    if (service.getId() == null) {
      service.setId(idGenerator.getAndIncrement());
    }
    services.put(service.getId(), service);
    return service;
  }
}