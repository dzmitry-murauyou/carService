package com.example.carservice.concurrency.service;

import com.example.carservice.concurrency.dto.RaceConditionAttemptResult;
import com.example.carservice.concurrency.dto.RaceConditionResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.stereotype.Service;

@Service
public class RaceConditionDemoService {

  public RaceConditionResponse runDemo(int threads, int incrementsPerThread, int attempts) {
    int expected = threads * incrementsPerThread;
    List<RaceConditionAttemptResult> results = new ArrayList<>();
    boolean raceDetected = false;

    for (int i = 1; i <= attempts; i++) {
      int unsafeActual = runUnsafeCounter(threads, incrementsPerThread);
      int safeActual = runSafeCounter(threads, incrementsPerThread);
      raceDetected = raceDetected || unsafeActual < expected;

      results.add(RaceConditionAttemptResult.builder()
          .attempt(i)
          .unsafeActual(unsafeActual)
          .safeActual(safeActual)
          .build());
    }

    return RaceConditionResponse.builder()
        .threads(threads)
        .incrementsPerThread(incrementsPerThread)
        .expected(expected)
        .raceDetected(raceDetected)
        .attempts(results)
        .build();
  }

  private int runUnsafeCounter(int threads, int incrementsPerThread) {
    UnsafeCounter counter = new UnsafeCounter();
    executeInParallel(threads, () -> {
      for (int i = 0; i < incrementsPerThread; i++) {
        counter.increment();
      }
    });
    return counter.get();
  }

  private int runSafeCounter(int threads, int incrementsPerThread) {
    AtomicInteger counter = new AtomicInteger(0);
    executeInParallel(threads, () -> {
      for (int i = 0; i < incrementsPerThread; i++) {
        counter.incrementAndGet();
      }
    });
    return counter.get();
  }

  private void executeInParallel(int threads, Runnable task) {
    ExecutorService executor = Executors.newFixedThreadPool(threads);
    CountDownLatch latch = new CountDownLatch(threads);
    for (int i = 0; i < threads; i++) {
      executor.submit(() -> {
        try {
          task.run();
        } finally {
          latch.countDown();
        }
      });
    }

    try {
      if (!latch.await(30, TimeUnit.SECONDS)) {
        throw new IllegalStateException("Parallel execution timed out");
      }
    } catch (InterruptedException ex) {
      Thread.currentThread().interrupt();
      throw new IllegalStateException("Parallel execution interrupted", ex);
    } finally {
      executor.shutdownNow();
    }
  }

  private static class UnsafeCounter {

    private int value = 0;

    void increment() {
      int current = value;
      if ((current & 31) == 0) {
        Thread.yield();
      }
      value = current + 1;
    }

    int get() {
      return value;
    }
  }
}
