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
        save(new ServiceEntity(null, "Замена масла",
                "Замена моторного масла и масляного фильтра",
                2500.0, 60, "ТО", true, "Иван Петров", "Скидка 10%"));

        save(new ServiceEntity(null, "Диагностика двигателя",
                "Компьютерная диагностика двигателя",
                1500.0, 30, "Диагностика", true, "Петр Сидоров", "Запись за 2 дня"));

        save(new ServiceEntity(null, "Ремонт подвески",
                "Замена амортизаторов",
                5000.0, 120, "Ремонт", true, "Алексей Иванов", "Оригинальные запчасти"));
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