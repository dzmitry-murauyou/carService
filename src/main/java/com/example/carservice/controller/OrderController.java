package com.example.carservice.controller;

import com.example.carservice.dto.OrderDto;
import com.example.carservice.service.OrderService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

  private final OrderService orderService;

  @GetMapping
  public List<OrderDto> getAllOrders() {
    return orderService.getAllOrders();
  }

  @GetMapping("/{id}")
  public OrderDto getOrderById(@PathVariable Long id) {
    return orderService.getOrderById(id);
  }

  @GetMapping("/car/{carId}")
  public List<OrderDto> getOrdersByCar(@PathVariable Long carId) {
    return orderService.getOrdersByCar(carId);
  }

  @GetMapping("/client/{clientId}")
  public List<OrderDto> getOrdersByClient(@PathVariable Long clientId) {
    return orderService.getOrdersByClient(clientId);
  }

  @GetMapping("/status/{status}")
  public List<OrderDto> getOrdersByStatus(@PathVariable String status) {
    return orderService.getOrdersByStatus(status);
  }

  @GetMapping("/date-range")
  public List<OrderDto> getOrdersByDateRange(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
    return orderService.getOrdersByDateRange(start, end);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public OrderDto createOrder(@RequestBody OrderDto orderDto) {
    return orderService.createOrder(orderDto);
  }

  @PutMapping("/{id}")
  public OrderDto updateOrder(@PathVariable Long id, @RequestBody OrderDto orderDto) {
    return orderService.updateOrder(id, orderDto);
  }

  @PatchMapping("/{id}/cancel")
  public OrderDto cancelOrder(@PathVariable Long id) {
    return orderService.cancelOrder(id);
  }

  @PatchMapping("/{id}/complete")
  public OrderDto completeOrder(@PathVariable Long id) {
    return orderService.completeOrder(id);
  }
}