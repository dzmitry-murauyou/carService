package com.example.carservice.config;

import com.example.carservice.repository.CarBrandModelRepository;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.repository.MechanicRepository;
import com.example.carservice.repository.OrderRepository;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.repository.SpareRepository;
import com.example.carservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);
  private final ClientRepository clientRepository;
  private final CarRepository carRepository;
  private final MechanicRepository mechanicRepository;
  private final ServiceRepository serviceRepository;
  private final SpareRepository spareRepository;
  private final OrderRepository orderRepository;
  private final OrderService orderService;
  private final CarBrandModelRepository carBrandModelRepository;

  @Override
  public void run(String... args) throws Exception {

    log.info("=== ПРОВЕРКА ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ ===");
    log.info("База данных подключена успешно!");
    log.info("Клиентов в БД: {}", clientRepository.count());
    log.info("Машин в БД: {}", carRepository.count());
    log.info("Механиков в БД: {}", mechanicRepository.count());
    log.info("Услуг в БД: {}", serviceRepository.count());
    log.info("Запчастей в БД: {}", spareRepository.count());
    log.info("Заказов в БД: {}", orderRepository.count());
    log.info("Марок/моделей в БД: {}", carBrandModelRepository.count());
    log.info("=== БАЗА ДАННЫХ ГОТОВА К РАБОТЕ ===");
    log.info("НИКАКИЕ ДАННЫЕ НЕ БЫЛИ СОЗДАНЫ АВТОМАТИЧЕСКИ");
    log.info("Используйте интерфейс приложения для добавления данных");
  }
}