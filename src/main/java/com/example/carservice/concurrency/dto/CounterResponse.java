package com.example.carservice.concurrency.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CounterResponse {
  long value;
}
