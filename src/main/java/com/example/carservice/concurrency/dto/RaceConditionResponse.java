package com.example.carservice.concurrency.dto;

import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class RaceConditionResponse {
  int threads;
  int incrementsPerThread;
  int expected;
  boolean raceDetected;
  List<RaceConditionAttemptResult> attempts;
}
