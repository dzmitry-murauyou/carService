package com.example.carservice.service.impl;

import com.example.carservice.dto.OrderDto;
import com.example.carservice.dto.mapper.OrderMapper;
import com.example.carservice.exception.OrderNotFoundException;
import com.example.carservice.exception.ResourceNotFoundException;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

  private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);
  private static final String ORDER_NOT_FOUND = "Order not found with id: ";
  private static final String CAR_NOT_FOUND = "Car not found with id: ";
  private static final String MECHANIC_NOT_FOUND = "Mechanic not found with id: ";

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
        .orElseThrow(() -> new OrderNotFoundException(ORDER_NOT_FOUND + id));
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
          .orElseThrow(() -> new OrderNotFoundException(CAR_NOT_FOUND
              + orderDto.getCarId()));
      order.setCar(car);
    }

    if (orderDto.getMechanicId() != null) {
      Mechanic mechanic = mechanicRepository.findById(orderDto.getMechanicId())
          .orElseThrow(() -> new OrderNotFoundException(MECHANIC_NOT_FOUND
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
  public void deleteOrder(Long id) {
    if (!orderRepository.existsById(id)) {
      throw new ResourceNotFoundException("Order not found with id: " + id);
    }
    orderRepository.deleteById(id);
  }

  @Override
  @Transactional
  public OrderDto updateOrder(Long id, OrderDto orderDto) {
    Order existing = orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(ORDER_NOT_FOUND + id));

    existing.setDescription(orderDto.getDescription());
    existing.setTotalPrice(orderDto.getTotalPrice());
    existing.setCompletionDate(orderDto.getCompletionDate());

    if (orderDto.getCarId() != null) {
      Car car = carRepository.findById(orderDto.getCarId())
          .orElseThrow(() -> new OrderNotFoundException(CAR_NOT_FOUND + orderDto.getCarId()));
      existing.setCar(car);
    }

    if (orderDto.getMechanicId() != null) {
      Mechanic mechanic = mechanicRepository.findById(orderDto.getMechanicId())
          .orElseThrow(() -> new OrderNotFoundException(MECHANIC_NOT_FOUND
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
        .orElseThrow(() -> new OrderNotFoundException(ORDER_NOT_FOUND + id));

    order.setStatus("CANCELLED");
    Order cancelled = orderRepository.save(order);
    return mapper.toDto(cancelled);
  }

  @Override
  @Transactional
  public OrderDto completeOrder(Long id) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(ORDER_NOT_FOUND + id));

    order.setStatus("COMPLETED");
    order.setCompletionDate(LocalDateTime.now());
    Order completed = orderRepository.save(order);
    return mapper.toDto(completed);
  }

  @Override
  public void demonstrateNplus1Problem() {
    log.info("=== Без оптимизации (N+1) ===");
    List<Order> orders1 = orderRepository.findAll();
    for (Order order : orders1) {
      if (order.getCar() != null && order.getCar().getClient() != null) {
        order.getCar().getClient().getLastName();
      }
    }

    log.info("=== С оптимизацией (один запрос) ===");
    List<Order> orders2 = orderRepository.findAll();
    for (Order order : orders2) {
      if (order.getCar() != null && order.getCar().getClient() != null) {
        order.getCar().getClient().getLastName();
      }
    }
  }

  @Override
  public void createOrderWithoutTransaction(OrderDto orderDto) {
    log.info("=== СОХРАНЕНИЕ БЕЗ @Transactional ===");

    Car car = carRepository.findById(orderDto.getCarId())
        .orElseThrow(() -> new OrderNotFoundException(CAR_NOT_FOUND + orderDto.getCarId()));

    Order order = mapper.toEntity(orderDto);
    order.setCar(car);

    Order savedOrder = orderRepository.save(order);
    log.info("1. Заказ сохранён, ID: {}", savedOrder.getId());

    if (orderDto.getServiceIds() != null && !orderDto.getServiceIds().isEmpty()) {
      List<ServiceEntity> services = serviceRepository.findAllById(orderDto.getServiceIds());
      savedOrder.setServices(new HashSet<>(services));
      orderRepository.save(savedOrder);
      log.info("2. Услуги добавлены");
    }

    log.info("3. Имитируем ошибку...");
    throw new OrderNotFoundException("Ошибка после частичного сохранения! Заказ остался в БД.");
  }

  @Override
  @Transactional
  public void createOrderWithTransaction(OrderDto orderDto) {
    log.info("=== СОХРАНЕНИЕ С @Transactional ===");

    Car car = carRepository.findById(orderDto.getCarId())
        .orElseThrow(() -> new OrderNotFoundException(CAR_NOT_FOUND + orderDto.getCarId()));

    Order order = mapper.toEntity(orderDto);
    order.setCar(car);

    Order savedOrder = orderRepository.save(order);
    log.info("1. Заказ сохранён, ID: {}", savedOrder.getId());

    if (orderDto.getServiceIds() != null && !orderDto.getServiceIds().isEmpty()) {
      List<ServiceEntity> services = serviceRepository.findAllById(orderDto.getServiceIds());
      savedOrder.setServices(new HashSet<>(services));
      orderRepository.save(savedOrder);
      log.info("2. Услуги добавлены");
    }

    log.info("3. Имитируем ошибку...");
    throw new OrderNotFoundException("Ошибка! Всё должно откатиться.");
  }
}