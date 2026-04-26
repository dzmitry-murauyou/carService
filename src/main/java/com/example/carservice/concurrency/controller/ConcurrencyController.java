package com.example.carservice.concurrency.controller;

import com.example.carservice.concurrency.dto.CounterResponse;
import com.example.carservice.concurrency.dto.RaceConditionResponse;
import com.example.carservice.concurrency.service.RaceConditionDemoService;
import com.example.carservice.concurrency.service.ThreadSafeCounterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/concurrency")
@RequiredArgsConstructor
@Tag(name = "Concurrency", description = "Thread-safe counter and race-condition demo")
public class ConcurrencyController {

  private final ThreadSafeCounterService counterService;
  private final RaceConditionDemoService raceConditionDemoService;

  @Operation(summary = "Increment thread-safe atomic counter")
  @PostMapping("/counter/increment")
  public ResponseEntity<CounterResponse> incrementCounter(
      @RequestParam(defaultValue = "1") long times
  ) {
    long newValue = counterService.addAndGet(times);
    return ResponseEntity.ok(CounterResponse.builder().value(newValue).build());
  }

  @Operation(summary = "Read thread-safe atomic counter")
  @GetMapping("/counter")
  public ResponseEntity<CounterResponse> getCounterValue() {
    return ResponseEntity.ok(CounterResponse.builder().value(counterService.getValue()).build());
  }

  @Operation(summary = "Reset thread-safe atomic counter")
  @PostMapping("/counter/reset")
  public ResponseEntity<CounterResponse> resetCounter() {
    counterService.reset();
    return ResponseEntity.ok(CounterResponse.builder().value(0).build());
  }

  @Operation(summary = "Run race condition demo with 50+ threads")
  @GetMapping("/race-demo")
  public ResponseEntity<RaceConditionResponse> runRaceDemo(
      @RequestParam(defaultValue = "64") int threads,
      @RequestParam(defaultValue = "20000") int incrementsPerThread,
      @RequestParam(defaultValue = "3") int attempts
  ) {
    int normalizedThreads = Math.max(50, threads);
    int normalizedIncrements = Math.max(1, incrementsPerThread);
    int normalizedAttempts = Math.max(1, attempts);
    RaceConditionResponse response = raceConditionDemoService.runDemo(
        normalizedThreads,
        normalizedIncrements,
        normalizedAttempts
    );
    return ResponseEntity.ok(response);
  }
}
