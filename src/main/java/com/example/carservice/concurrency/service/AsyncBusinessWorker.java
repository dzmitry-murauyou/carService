package com.example.carservice.concurrency.service;

import com.example.carservice.concurrency.model.TaskInfo;
import com.example.carservice.concurrency.model.TaskStatus;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.concurrent.CompletableFuture;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AsyncBusinessWorker {

  private final AsyncTaskRegistry taskRegistry;
  private final ThreadSafeCounterService counterService;

  @Async("businessTaskExecutor")
  public CompletableFuture<Void> execute(String taskId, String payload, long delayMs) {
    TaskInfo pending = taskRegistry.findById(taskId)
        .orElseThrow(() -> new IllegalStateException("Task not found: " + taskId));

    taskRegistry.save(pending.toBuilder()
        .status(TaskStatus.RUNNING)
        .startedAt(LocalDateTime.now())
        .build());

    try {
      Thread.sleep(delayMs);
      String result = "Processed payload: " + payload.toUpperCase(Locale.ROOT);
      counterService.incrementAndGet();

      TaskInfo running = taskRegistry.findById(taskId)
          .orElseThrow(() -> new IllegalStateException("Task not found: " + taskId));
      taskRegistry.save(running.toBuilder()
          .status(TaskStatus.COMPLETED)
          .result(result)
          .finishedAt(LocalDateTime.now())
          .build());
      return CompletableFuture.completedFuture(null);
    } catch (InterruptedException ex) {
      Thread.currentThread().interrupt();
      markAsFailed(taskId, "Task interrupted");
      return CompletableFuture.failedFuture(ex);
    } catch (Exception ex) {
      markAsFailed(taskId, ex.getMessage());
      return CompletableFuture.failedFuture(ex);
    }
  }

  private void markAsFailed(String taskId, String message) {
    taskRegistry.findById(taskId).ifPresent(task -> taskRegistry.save(
        task.toBuilder()
            .status(TaskStatus.FAILED)
            .errorMessage(message)
            .finishedAt(LocalDateTime.now())
            .build()
    ));
  }
}
