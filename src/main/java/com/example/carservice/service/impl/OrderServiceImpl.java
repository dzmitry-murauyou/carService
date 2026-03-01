package com.example.carservice.service.impl;

import com.example.carservice.dto.OrderDto;
import com.example.carservice.dto.mapper.OrderMapper;
import com.example.carservice.model.Car;
import com.example.carservice.model.Mechanic;
import com.example.carservice.model.Order;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.model.Spare;
import com.example.carservice.repository.CarRepository;
import com.example.carservice.repository.MechanicRepository;
import com.example.carservice.repository.OrderRepository;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.repository.SpareRepository;
import com.example.carservice.service.OrderService;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;
  private final CarRepository carRepository;
  private final MechanicRepository mechanicRepository;
  private final ServiceRepository serviceRepository;
  private final SpareRepository spareRepository;
  private final OrderMapper mapper;

  @Override
  public List<OrderDto> getAllOrders() {
    return orderRepository.findAll().stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public OrderDto getOrderById(Long id) {
    return orderRepository.findById(id)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  public List<OrderDto> getOrdersByCar(Long carId) {
    return orderRepository.findByCarId(carId).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public List<OrderDto> getOrdersByClient(Long clientId) {
    return orderRepository.findByClientId(clientId).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public List<OrderDto> getOrdersByStatus(String status) {
    return orderRepository.findByStatus(status).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public List<OrderDto> getOrdersByDateRange(LocalDateTime start, LocalDateTime end) {
    return orderRepository.findByOrderDateBetween(start, end).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public OrderDto createOrder(OrderDto orderDto) {
    Order order = mapper.toEntity(orderDto);

    if (orderDto.getCarId() != null) {
      Car car = carRepository.findById(orderDto.getCarId())
          .orElseThrow(() -> new RuntimeException("Car not found with id: " + orderDto.getCarId()));
      order.setCar(car);
    }

    if (orderDto.getMechanicId() != null) {
      Mechanic mechanic = mechanicRepository.findById(orderDto.getMechanicId())
          .orElseThrow(() -> new RuntimeException("Mechanic not found with id: "
              + orderDto.getMechanicId()));
      order.setMechanic(mechanic);
    }

    if (orderDto.getServiceIds() != null) {
      List<ServiceEntity> serviceList = serviceRepository.findAllById(orderDto.getServiceIds());
      order.setServices(new HashSet<>(serviceList));
    } else {
      order.setServices(new HashSet<>());
    }

    if (orderDto.getSpareIds() != null) {
      List<Spare> spareList = spareRepository.findAllById(orderDto.getSpareIds());
      order.setSpares(new HashSet<>(spareList));
    } else {
      order.setSpares(new HashSet<>());
    }

    if (orderDto.getTotalPrice() == null) {
      double total = 0.0;
      if (order.getServices() != null) {
        total += order.getServices().stream().mapToDouble(ServiceEntity::getPrice).sum();
      }
      if (order.getSpares() != null) {
        total += order.getSpares().stream().mapToDouble(Spare::getPrice).sum();
      }
      order.setTotalPrice(total);
    }

    if (order.getOrderDate() == null) {
      order.setOrderDate(LocalDateTime.now());
    }

    if (order.getStatus() == null) {
      order.setStatus("NEW");
    }

    Order saved = orderRepository.save(order);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public OrderDto updateOrder(Long id, OrderDto orderDto) {
    Order existing = orderRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

    existing.setDescription(orderDto.getDescription());
    existing.setTotalPrice(orderDto.getTotalPrice());
    existing.setCompletionDate(orderDto.getCompletionDate());

    if (orderDto.getCarId() != null) {
      Car car = carRepository.findById(orderDto.getCarId())
          .orElseThrow(() -> new RuntimeException("Car not found with id: " + orderDto.getCarId()));
      existing.setCar(car);
    }

    if (orderDto.getMechanicId() != null) {
      Mechanic mechanic = mechanicRepository.findById(orderDto.getMechanicId())
          .orElseThrow(() -> new RuntimeException("Mechanic not found with id: "
              + orderDto.getMechanicId()));
      existing.setMechanic(mechanic);
    }

    if (orderDto.getServiceIds() != null) {
      List<ServiceEntity> serviceList = serviceRepository.findAllById(orderDto.getServiceIds());
      existing.setServices(new HashSet<>(serviceList));
    } else {
      existing.setServices(new HashSet<>());
    }

    if (orderDto.getSpareIds() != null) {
      List<Spare> spareList = spareRepository.findAllById(orderDto.getSpareIds());
      existing.setSpares(new HashSet<>(spareList));
    } else {
      existing.setSpares(new HashSet<>());
    }

    if ("COMPLETED".equals(orderDto.getStatus()) && existing.getCompletionDate() == null) {
      existing.setCompletionDate(LocalDateTime.now());
    }

    existing.setStatus(orderDto.getStatus());

    Order updated = orderRepository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public OrderDto cancelOrder(Long id) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

    order.setStatus("CANCELLED");
    Order cancelled = orderRepository.save(order);
    return mapper.toDto(cancelled);
  }

  @Override
  @Transactional
  public OrderDto completeOrder(Long id) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

    order.setStatus("COMPLETED");
    order.setCompletionDate(LocalDateTime.now());
    Order completed = orderRepository.save(order);
    return mapper.toDto(completed);
  }

  public void demonstrateNplus1Problem() {
    System.out.println("=== Без оптимизации (N+1) ===");
    List<Order> orders1 = orderRepository.findAll();
    for (Order order : orders1) {
      if (order.getCar() != null && order.getCar().getClient() != null) {
        order.getCar().getClient().getLastName();
      }
    }

    System.out.println("=== С оптимизацией (один запрос) ===");
    List<Order> orders2 = orderRepository.findAll();
    for (Order order : orders2) {
      if (order.getCar() != null && order.getCar().getClient() != null) {
        order.getCar().getClient().getLastName();
      }
    }
  }

  public void createOrderWithoutTransaction(OrderDto orderDto) {
    System.out.println("=== СОХРАНЕНИЕ БЕЗ @Transactional ===");

    Car car = carRepository.findById(orderDto.getCarId())
        .orElseThrow(() -> new RuntimeException("Car not found"));

    Order order = mapper.toEntity(orderDto);
    order.setCar(car);

    Order savedOrder = orderRepository.save(order);
    System.out.println("1. Заказ сохранён, ID: " + savedOrder.getId());

    if (orderDto.getServiceIds() != null && !orderDto.getServiceIds().isEmpty()) {
      List<ServiceEntity> services = serviceRepository.findAllById(orderDto.getServiceIds());
      savedOrder.setServices(new HashSet<>(services));
      orderRepository.save(savedOrder);
      System.out.println("2. Услуги добавлены");
    }

    System.out.println("3. Имитируем ошибку...");
    throw new RuntimeException("Ошибка после частичного сохранения! Заказ остался в БД.");
  }

  @Transactional
  public void createOrderWithTransaction(OrderDto orderDto) {
    System.out.println("=== СОХРАНЕНИЕ С @Transactional ===");

    Car car = carRepository.findById(orderDto.getCarId())
        .orElseThrow(() -> new RuntimeException("Car not found"));

    Order order = mapper.toEntity(orderDto);
    order.setCar(car);

    Order savedOrder = orderRepository.save(order);
    System.out.println("1. Заказ сохранён, ID: " + savedOrder.getId());

    if (orderDto.getServiceIds() != null && !orderDto.getServiceIds().isEmpty()) {
      List<ServiceEntity> services = serviceRepository.findAllById(orderDto.getServiceIds());
      savedOrder.setServices(new HashSet<>(services));
      orderRepository.save(savedOrder);
      System.out.println("2. Услуги добавлены");
    }

    System.out.println("3. Имитируем ошибку...");
    throw new RuntimeException("Ошибка! Всё должно откатиться.");
  }
}