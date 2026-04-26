package com.example.carservice.concurrency;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.carservice.concurrency.dto.RaceConditionResponse;
import com.example.carservice.concurrency.service.RaceConditionDemoService;
import com.example.carservice.concurrency.service.ThreadSafeCounterService;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;

class ConcurrencyServicesTest {

  @Test
  void atomicCounterShouldKeepCorrectValueUnderConcurrency() throws Exception {
    int threads = 64;
    int incrementsPerThread = 1000;
    final long expected = (long) threads * incrementsPerThread;
    ThreadSafeCounterService service = new ThreadSafeCounterService();
    ExecutorService executor = Executors.newFixedThreadPool(threads);
    CountDownLatch latch = new CountDownLatch(threads);

    for (int i = 0; i < threads; i++) {
      executor.submit(() -> {
        try {
          for (int j = 0; j < incrementsPerThread; j++) {
            service.incrementAndGet();
          }
        } finally {
          latch.countDown();
        }
      });
    }

    boolean completed = latch.await(20, TimeUnit.SECONDS);
    executor.shutdownNow();

    assertTrue(completed, "Workers did not complete in time");
    assertEquals(expected, service.getValue());
  }

  @Test
  void raceDemoShouldShowUnsafeCounterCorruptionAndSafeCounterCorrectness() {
    RaceConditionDemoService service = new RaceConditionDemoService();
    RaceConditionResponse response = service.runDemo(64, 20000, 3);
    int expected = response.getExpected();

    assertTrue(response.isRaceDetected());
    response.getAttempts().forEach(attempt -> {
      assertEquals(expected, attempt.getSafeActual());
      assertTrue(attempt.getUnsafeActual() <= expected);
    });
  }
}
