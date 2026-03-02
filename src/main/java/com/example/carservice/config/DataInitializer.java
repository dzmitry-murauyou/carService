package com.example.carservice.config;

import com.example.carservice.dto.OrderDto;
import com.example.carservice.model.Car;
import com.example.carservice.model.Client;
import com.example.carservice.model.Mechanic;
import com.example.carservice.model.Order;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.model.Spare;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.ClientRepository;
import com.example.carservice.repository.MechanicRepository;
import com.example.carservice.repository.OrderRepository;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.repository.SpareRepository;
import com.example.carservice.service.OrderService;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
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

  @Override
  public void run(String... args) throws Exception {

    log.info("=== Очистка старых данных ===");
    orderRepository.deleteAll();
    spareRepository.deleteAll();
    serviceRepository.deleteAll();
    mechanicRepository.deleteAll();
    carRepository.deleteAll();
    clientRepository.deleteAll();

    log.info("=== Создание клиентов ===");

    Client client1 = Client.builder()
        .firstName("Иван")
        .lastName("Петров")
        .phone("+375(29)123-45-67")
        .email("ivan.petrov@mail.ru")
        .address("г. Минск, ул. Независимости, д.10, кв.5")
        .registrationDate(LocalDate.now().minusMonths(2))
        .build();

    Client client2 = Client.builder()
        .firstName("Мария")
        .lastName("Сидорова")
        .phone("+375(33)765-43-21")
        .email("maria.sidorova@tut.by")
        .address("г. Минск, ул. Победителей, д.15, кв.20")
        .registrationDate(LocalDate.now().minusMonths(1))
        .build();

    Client client3 = Client.builder()
        .firstName("Алексей")
        .lastName("Ковалёв")
        .phone("+375(29)555-55-55")
        .email("alex.kovalev@gmail.com")
        .address("г. Гомель, ул. Советская, д.5, кв.12")
        .registrationDate(LocalDate.now().minusDays(5))
        .build();

    Client client4 = Client.builder()
        .firstName("Елена")
        .lastName("Новикова")
        .phone("+375(25)111-22-33")
        .email("elena.novikova@bk.ru")
        .address("г. Брест, ул. Машерова, д.8, кв.15")
        .registrationDate(LocalDate.now())
        .build();

    clientRepository.saveAll(List.of(client1, client2, client3, client4));

    log.info("=== Создание машин ===");

    Car car1 = Car.builder()
        .brand("Volkswagen")
        .model("Passat")
        .year(2019)
        .licensePlate("1234 AB-5")
        .vin("WVWZZZ3CZJE123456")
        .client(client1)
        .build();

    Car car2 = Car.builder()
        .brand("Renault")
        .model("Logan")
        .year(2020)
        .licensePlate("5678 CD-6")
        .vin("VF1LMJ76543123456")
        .client(client1)
        .build();

    Car car3 = Car.builder()
        .brand("Audi")
        .model("Q5")
        .year(2022)
        .licensePlate("9012 EF-7")
        .vin("WAUZZZ8R6DA123456")
        .client(client2)
        .build();

    Car car4 = Car.builder()
        .brand("Skoda")
        .model("Octavia")
        .year(2021)
        .licensePlate("3456 GH-8")
        .vin("TMBJM21Z3K1234567")
        .client(client3)
        .build();

    Car car5 = Car.builder()
        .brand("Nissan")
        .model("Qashqai")
        .year(2023)
        .licensePlate("7890 IJ-9")
        .vin("SJNFDAJ11U1234567")
        .client(client4)
        .build();

    carRepository.saveAll(List.of(car1, car2, car3, car4, car5));

    log.info("=== Создание механиков ===");

    Mechanic mech1 = Mechanic.builder()
        .firstName("Сергей")
        .lastName("Васильев")
        .specialization("Двигатели")
        .hireDate(LocalDate.now().minusYears(5))
        .phone("+375(29)111-22-33")
        .salary(1800.0)
        .build();

    Mechanic mech2 = Mechanic.builder()
        .firstName("Дмитрий")
        .lastName("Николаев")
        .specialization("Подвеска")
        .hireDate(LocalDate.now().minusYears(2))
        .phone("+375(33)444-55-66")
        .salary(1500.0)
        .build();

    Mechanic mech3 = Mechanic.builder()
        .firstName("Андрей")
        .lastName("Козлов")
        .specialization("Электрика")
        .hireDate(LocalDate.now().minusYears(3))
        .phone("+375(29)777-88-99")
        .salary(1600.0)
        .build();

    Mechanic mech4 = Mechanic.builder()
        .firstName("Павел")
        .lastName("Соколов")
        .specialization("Кузовной ремонт")
        .hireDate(LocalDate.now().minusYears(1))
        .phone("+375(25)333-44-55")
        .salary(1400.0)
        .build();

    mechanicRepository.saveAll(List.of(mech1, mech2, mech3, mech4));

    log.info("=== Создание услуг ===");

    ServiceEntity serv1 = ServiceEntity.builder()
        .name("Замена масла")
        .description("Замена моторного масла и масляного фильтра")
        .price(120.0)
        .durationMinutes(60)
        .category("ТО")
        .available(true)
        .build();

    ServiceEntity serv2 = ServiceEntity.builder()
        .name("Диагностика двигателя")
        .description("Компьютерная диагностика двигателя")
        .price(80.0)
        .durationMinutes(30)
        .category("Диагностика")
        .available(true)
        .build();

    ServiceEntity serv3 = ServiceEntity.builder()
        .name("Замена тормозных колодок")
        .description("Замена передних/задних тормозных колодок")
        .price(150.0)
        .durationMinutes(90)
        .category("Ремонт")
        .available(true)
        .build();

    ServiceEntity serv4 = ServiceEntity.builder()
        .name("Ремонт подвески")
        .description("Замена амортизаторов и сайлентблоков")
        .price(250.0)
        .durationMinutes(180)
        .category("Ремонт")
        .available(true)
        .build();

    ServiceEntity serv5 = ServiceEntity.builder()
        .name("Покраска элемента")
        .description("Покраска одной детали кузова")
        .price(300.0)
        .durationMinutes(240)
        .category("Кузовной ремонт")
        .available(true)
        .build();

    serviceRepository.saveAll(List.of(serv1, serv2, serv3, serv4, serv5));

    log.info("=== Создание запчастей ===");

    Spare spare1 = Spare.builder()
        .name("Масляный фильтр")
        .partNumber("OF-12345")
        .price(15.0)
        .quantityInStock(50)
        .manufacturer("MANN-FILTER")
        .build();

    Spare spare2 = Spare.builder()
        .name("Тормозные колодки передние")
        .partNumber("BP-67890")
        .price(85.0)
        .quantityInStock(20)
        .manufacturer("Brembo")
        .build();

    Spare spare3 = Spare.builder()
        .name("Амортизатор передний")
        .partNumber("SH-54321")
        .price(180.0)
        .quantityInStock(8)
        .manufacturer("KYB")
        .build();

    Spare spare4 = Spare.builder()
        .name("Свеча зажигания")
        .partNumber("SP-98765")
        .price(12.0)
        .quantityInStock(100)
        .manufacturer("NGK")
        .build();

    Spare spare5 = Spare.builder()
        .name("Ремень ГРМ")
        .partNumber("BL-24680")
        .price(65.0)
        .quantityInStock(15)
        .manufacturer("Bosch")
        .build();

    spareRepository.saveAll(List.of(spare1, spare2, spare3, spare4, spare5));

    log.info("=== Создание заказов ===");

    Order order1 = Order.builder()
        .orderDate(LocalDateTime.now().minusDays(5))
        .status("COMPLETED")
        .totalPrice(120.0 + 15.0)
        .description("Плановое ТО")
        .completionDate(LocalDateTime.now().minusDays(4))
        .car(car1)
        .mechanic(mech1)
        .services(Set.of(serv1))
        .spares(Set.of(spare1))
        .build();

    Order order2 = Order.builder()
        .orderDate(LocalDateTime.now().minusDays(3))
        .status("IN_PROGRESS")
        .totalPrice(150.0 + 85.0)
        .description("Замена тормозных колодок")
        .completionDate(null)
        .car(car3)
        .mechanic(mech2)
        .services(Set.of(serv3))
        .spares(Set.of(spare2))
        .build();

    Order order3 = Order.builder()
        .orderDate(LocalDateTime.now().minusDays(1))
        .status("NEW")
        .totalPrice(80.0 + 250.0 + 180.0)
        .description("Диагностика и ремонт подвески")
        .completionDate(null)
        .car(car5)
        .mechanic(mech3)
        .services(Set.of(serv2, serv4))
        .spares(Set.of(spare3))
        .build();

    Order order4 = Order.builder()
        .orderDate(LocalDateTime.now().minusDays(10))
        .status("CANCELLED")
        .totalPrice(0.0)
        .description("Клиент отменил запись")
        .completionDate(null)
        .car(car2)
        .mechanic(null)
        .services(Set.of())
        .spares(Set.of())
        .build();

    orderRepository.saveAll(List.of(order1, order2, order3, order4));

    log.info("Клиентов: {}", clientRepository.count());
    log.info("Машин: {}", carRepository.count());
    log.info("Механиков: {}", mechanicRepository.count());
    log.info("Услуг: {}", serviceRepository.count());
    log.info("Запчастей: {}", spareRepository.count());
    log.info("Заказов: {}", orderRepository.count());

    orderService.demonstrateNplus1Problem();

    Long firstCarId = carRepository.findAll().stream()
        .findFirst()
        .map(Car::getId)
        .orElseThrow(() -> new RuntimeException("Нет ни одной машины в базе!"));

    log.info("=== Используем машину с ID: {} ===", firstCarId);
    try {
      OrderDto dto = new OrderDto();
      dto.setCarId(firstCarId);
      dto.setServiceIds(List.of(1L));
      dto.setOrderDate(LocalDateTime.now());  // ← добавить
      dto.setStatus("NEW");                   // ← добавить

      log.info("\n=== ТЕСТ 1: Без @Transactional ===");
      orderService.createOrderWithoutTransaction(dto);
    } catch (Exception e) {
      log.error("Ошибка: {}", e.getMessage());
    }

    try {
      OrderDto dto = new OrderDto();
      dto.setCarId(firstCarId);
      dto.setServiceIds(List.of(1L));
      dto.setOrderDate(LocalDateTime.now());  // ← добавить
      dto.setStatus("NEW");                   // ← добавить

      log.info("\n=== ТЕСТ 2: С @Transactional ===");
      orderService.createOrderWithTransaction(dto);
    } catch (Exception e) {
      log.error("Ошибка: {}", e.getMessage());
    }
  }
}