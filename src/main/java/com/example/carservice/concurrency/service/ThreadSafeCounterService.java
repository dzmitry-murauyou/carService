package com.example.carservice.concurrency.service;

import org.springframework.stereotype.Service;

@Service
public class ThreadSafeCounterService {

  private long counter = 0;

  public synchronized void incrementAndGet() {
    ++counter;
  }

  public synchronized long addAndGet(long delta) {
    counter += delta;
    return counter;
  }

  public long getValue() {
    return counter;
  }

  public synchronized void reset() {
    counter = 0;
  }
}