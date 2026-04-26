package com.example.carservice.concurrency.service;

import com.example.carservice.concurrency.dto.TaskStatusResponse;
import com.example.carservice.concurrency.model.TaskInfo;
import com.example.carservice.concurrency.model.TaskStatus;
import com.example.carservice.exception.ResourceNotFoundException;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AsyncBusinessOperationService {

  private final AsyncTaskRegistry taskRegistry;
  private final AsyncBusinessWorker asyncBusinessWorker;

  public String startTask(String payload, long delayMs) {
    String taskId = UUID.randomUUID().toString();

    TaskInfo task = TaskInfo.builder()
        .taskId(taskId)
        .status(TaskStatus.PENDING)
        .payload(payload)
        .createdAt(LocalDateTime.now())
        .build();

    taskRegistry.save(task);
    asyncBusinessWorker.execute(taskId, payload, delayMs);
    return taskId;
  }

  public TaskStatusResponse getStatus(String taskId) {
    TaskInfo taskInfo = taskRegistry.findById(taskId)
        .orElseThrow(() -> new ResourceNotFoundException("Task not found: " + taskId));

    return TaskStatusResponse.builder()
        .taskId(taskInfo.getTaskId())
        .status(taskInfo.getStatus())
        .payload(taskInfo.getPayload())
        .result(taskInfo.getResult())
        .errorMessage(taskInfo.getErrorMessage())
        .createdAt(taskInfo.getCreatedAt())
        .startedAt(taskInfo.getStartedAt())
        .finishedAt(taskInfo.getFinishedAt())
        .build();
  }
}
