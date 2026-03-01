package com.example.carservice.service;

import com.example.carservice.dto.OrderDto;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {

  List<OrderDto> getAllOrders();

  OrderDto getOrderById(Long id);

  List<OrderDto> getOrdersByCar(Long carId);

  List<OrderDto> getOrdersByClient(Long clientId);

  List<OrderDto> getOrdersByStatus(String status);

  List<OrderDto> getOrdersByDateRange(LocalDateTime start, LocalDateTime end);

  OrderDto createOrder(OrderDto orderDto);

  OrderDto updateOrder(Long id, OrderDto orderDto);

  OrderDto cancelOrder(Long id);

  OrderDto completeOrder(Long id);

  void demonstrateNplus1Problem();

  void createOrderWithoutTransaction(OrderDto orderDto);

  void createOrderWithTransaction(OrderDto orderDto);
}