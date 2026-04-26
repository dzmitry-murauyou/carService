package com.example.carservice.concurrency.dto;

import com.example.carservice.concurrency.model.TaskStatus;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class TaskStatusResponse {
  String taskId;
  TaskStatus status;
  String payload;
  String result;
  String errorMessage;
  LocalDateTime createdAt;
  LocalDateTime startedAt;
  LocalDateTime finishedAt;
}
