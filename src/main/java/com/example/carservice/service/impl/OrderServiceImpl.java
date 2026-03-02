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
import java.util.Set;
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

  // ========== ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ==========

  private Car findCarById(Long carId) {
    return carRepository.findById(carId)
        .orElseThrow(() -> new OrderNotFoundException(CAR_NOT_FOUND + carId));
  }

  private Mechanic findMechanicById(Long mechanicId) {
    return mechanicRepository.findById(mechanicId)
        .orElseThrow(() -> new OrderNotFoundException(MECHANIC_NOT_FOUND + mechanicId));
  }

  private Set<ServiceEntity> getServiceSet(List<Long> serviceIds) {
    if (serviceIds == null || serviceIds.isEmpty()) {
      return new HashSet<>();
    }
    return new HashSet<>(serviceRepository.findAllById(serviceIds));
  }

  private Set<Spare> getSpareSet(List<Long> spareIds) {
    if (spareIds == null || spareIds.isEmpty()) {
      return new HashSet<>();
    }
    return new HashSet<>(spareRepository.findAllById(spareIds));
  }

  private void setCarAndMechanic(Order order, OrderDto dto) {
    if (dto.getCarId() != null) {
      order.setCar(findCarById(dto.getCarId()));
    }
    if (dto.getMechanicId() != null) {
      order.setMechanic(findMechanicById(dto.getMechanicId()));
    }
  }

  private void setServicesAndSpares(Order order, OrderDto dto) {
    order.setServices(getServiceSet(dto.getServiceIds()));
    order.setSpares(getSpareSet(dto.getSpareIds()));
  }

  private void calculateTotalPriceIfNeeded(Order order, OrderDto dto) {
    if (dto.getTotalPrice() == null) {
      double total = 0.0;
      if (order.getServices() != null) {
        total += order.getServices().stream().mapToDouble(ServiceEntity::getPrice).sum();
      }
      if (order.getSpares() != null) {
        total += order.getSpares().stream().mapToDouble(Spare::getPrice).sum();
      }
      order.setTotalPrice(total);
    }
  }

  private void setDefaultOrderDateAndStatus(Order order) {
    if (order.getOrderDate() == null) {
      order.setOrderDate(LocalDateTime.now());
    }
    if (order.getStatus() == null) {
      order.setStatus("NEW");
    }
  }

  private Order updateOrderStatus(Long id, String newStatus, boolean setCompletionDate) {
    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(ORDER_NOT_FOUND + id));
    order.setStatus(newStatus);
    if (setCompletionDate) {
      order.setCompletionDate(LocalDateTime.now());
    }
    return orderRepository.save(order);
  }

  private void processOrders(List<Order> orders) {
    for (Order order : orders) {
      if (order.getCar() != null && order.getCar().getClient() != null) {
        order.getCar().getClient().getLastName();
      }
    }
  }

  private void executeOrderCreation(OrderDto orderDto, boolean transactional, String errorMessage) {
    if (transactional) {
      log.info("=== СОХРАНЕНИЕ С @Transactional ===");
    } else {
      log.info("=== СОХРАНЕНИЕ БЕЗ @Transactional ===");
    }

    Car car = findCarById(orderDto.getCarId());
    Order order = mapper.toEntity(orderDto);
    order.setCar(car);

    Order savedOrder = orderRepository.save(order);
    log.info("1. Заказ сохранён, ID: {}", savedOrder.getId());

    if (orderDto.getServiceIds() != null && !orderDto.getServiceIds().isEmpty()) {
      Set<ServiceEntity> services = getServiceSet(orderDto.getServiceIds());
      savedOrder.setServices(services);
      orderRepository.save(savedOrder);
      log.info("2. Услуги добавлены");
    }

    log.info("3. Имитируем ошибку...");
    throw new OrderNotFoundException(errorMessage);
  }

  // ========== ОСНОВНЫЕ МЕТОДЫ ==========

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

    setCarAndMechanic(order, orderDto);
    setServicesAndSpares(order, orderDto);
    calculateTotalPriceIfNeeded(order, orderDto);
    setDefaultOrderDateAndStatus(order);

    Order saved = orderRepository.save(order);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public OrderDto updateOrder(Long id, OrderDto orderDto) {
    Order existing = orderRepository.findById(id)
        .orElseThrow(() -> new OrderNotFoundException(ORDER_NOT_FOUND + id));

    existing.setDescription(orderDto.getDescription());
    existing.setTotalPrice(orderDto.getTotalPrice());
    existing.setCompletionDate(orderDto.getCompletionDate());
    existing.setStatus(orderDto.getStatus());

    setCarAndMechanic(existing, orderDto);
    setServicesAndSpares(existing, orderDto);

    if ("COMPLETED".equals(orderDto.getStatus()) && existing.getCompletionDate() == null) {
      existing.setCompletionDate(LocalDateTime.now());
    }

    Order updated = orderRepository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteOrder(Long id) {
    if (!orderRepository.existsById(id)) {
      throw new ResourceNotFoundException(ORDER_NOT_FOUND + id);
    }
    orderRepository.deleteById(id);
  }

  @Override
  @Transactional
  public OrderDto cancelOrder(Long id) {
    return mapper.toDto(updateOrderStatus(id, "CANCELLED", false));
  }

  @Override
  @Transactional
  public OrderDto completeOrder(Long id) {
    return mapper.toDto(updateOrderStatus(id, "COMPLETED", true));
  }

  @Override
  public void demonstrateNplus1Problem() {
    log.info("=== Без оптимизации (N+1) ===");
    processOrders(orderRepository.findAll());

    log.info("=== С оптимизацией (один запрос) ===");
    processOrders(orderRepository.findAll());
  }

  @Override
  public void createOrderWithoutTransaction(OrderDto orderDto) {
    executeOrderCreation(orderDto, false,
        "Ошибка после частичного сохранения! Заказ остался в БД.");
  }

  @Override
  @Transactional
  public void createOrderWithTransaction(OrderDto orderDto) {
    executeOrderCreation(orderDto, true, "Ошибка! Всё должно откатиться.");
  }
}