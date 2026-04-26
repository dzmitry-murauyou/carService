package com.example.carservice.concurrency.service;

import com.example.carservice.concurrency.model.TaskInfo;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Component;

@Component
public class AsyncTaskRegistry {

  private final Map<String, TaskInfo> tasks = new ConcurrentHashMap<>();

  public void save(TaskInfo taskInfo) {
    tasks.put(taskInfo.getTaskId(), taskInfo);
  }

  public Optional<TaskInfo> findById(String taskId) {
    return Optional.ofNullable(tasks.get(taskId));
  }
}
