package com.example.carservice.controller;

import com.example.carservice.dto.OrderDto;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.OrderService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

  private final OrderService orderService;

  @GetMapping
  public ResponseEntity<List<OrderDto>> getAllOrders() {
    return ResponseEntity.ok(orderService.getAllOrders());
  }

  @GetMapping("/{id}")
  public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
    OrderDto order = orderService.getOrderById(id);
    if (order == null) {
      throw new ResourceNotFoundException("Order not found with id: " + id);
    }
    return ResponseEntity.ok(order);
  }

  @GetMapping("/car/{carId}")
  public ResponseEntity<List<OrderDto>> getOrdersByCar(@PathVariable Long carId) {
    return ResponseEntity.ok(orderService.getOrdersByCar(carId));
  }

  @GetMapping("/client/{clientId}")
  public ResponseEntity<List<OrderDto>> getOrdersByClient(@PathVariable Long clientId) {
    return ResponseEntity.ok(orderService.getOrdersByClient(clientId));
  }

  @GetMapping("/status/{status}")
  public ResponseEntity<List<OrderDto>> getOrdersByStatus(@PathVariable String status) {
    return ResponseEntity.ok(orderService.getOrdersByStatus(status));
  }

  @GetMapping("/date-range")
  public ResponseEntity<List<OrderDto>> getOrdersByDateRange(
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
      @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
    return ResponseEntity.ok(orderService.getOrdersByDateRange(start, end));
  }

  @PostMapping
  public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
    OrderDto created = orderService.createOrder(orderDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<OrderDto> updateOrder(@PathVariable Long id,
                                              @RequestBody OrderDto orderDto) {
    OrderDto updated = orderService.updateOrder(id, orderDto);
    if (updated == null) {
      throw new ResourceNotFoundException("Order not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @PatchMapping("/{id}/cancel")
  public ResponseEntity<OrderDto> cancelOrder(@PathVariable Long id) {
    OrderDto cancelled = orderService.cancelOrder(id);
    return ResponseEntity.ok(cancelled);
  }

  @PatchMapping("/{id}/complete")
  public ResponseEntity<OrderDto> completeOrder(@PathVariable Long id) {
    OrderDto completed = orderService.completeOrder(id);
    return ResponseEntity.ok(completed);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
    orderService.deleteOrder(id);
    return ResponseEntity.noContent().build();
  }
}