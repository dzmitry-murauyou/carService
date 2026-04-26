package com.example.carservice.concurrency.controller;

import com.example.carservice.concurrency.dto.TaskStartRequest;
import com.example.carservice.concurrency.dto.TaskStartResponse;
import com.example.carservice.concurrency.dto.TaskStatusResponse;
import com.example.carservice.concurrency.service.AsyncBusinessOperationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/async/tasks")
@RequiredArgsConstructor
@Tag(name = "Async Tasks", description = "Async business operation and task tracking")
public class AsyncTaskController {

  private final AsyncBusinessOperationService asyncBusinessOperationService;

  @Operation(summary = "Start async business operation and return task ID")
  @PostMapping
  public ResponseEntity<TaskStartResponse> startTask(@Valid @RequestBody TaskStartRequest request) {
    String taskId = asyncBusinessOperationService.startTask(request.getPayload(),
        request.getDelayMs());
    return ResponseEntity.status(HttpStatus.ACCEPTED)
        .body(TaskStartResponse.builder().taskId(taskId).build());
  }

  @Operation(summary = "Get async task status by task ID")
  @GetMapping("/{taskId}")
  public ResponseEntity<TaskStatusResponse> getTaskStatus(@PathVariable String taskId) {
    return ResponseEntity.ok(asyncBusinessOperationService.getStatus(taskId));
  }
}
