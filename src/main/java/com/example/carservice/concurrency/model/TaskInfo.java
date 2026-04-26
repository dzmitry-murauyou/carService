package com.example.carservice.concurrency.model;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Value;

@Value
@Builder(toBuilder = true)
public class TaskInfo {
  String taskId;
  TaskStatus status;
  String payload;
  String result;
  String errorMessage;
  LocalDateTime createdAt;
  LocalDateTime startedAt;
  LocalDateTime finishedAt;
}
