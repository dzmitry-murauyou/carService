package com.example.carservice.concurrency.service;

import java.util.concurrent.atomic.AtomicLong;
import org.springframework.stereotype.Service;

@Service
public class ThreadSafeCounterService {

  private final AtomicLong counter = new AtomicLong(0);

  public long incrementAndGet() {
    return counter.incrementAndGet();
  }

  public long addAndGet(long delta) {
    return counter.addAndGet(delta);
  }

  public long getValue() {
    return counter.get();
  }

  public void reset() {
    counter.set(0);
  }
}
