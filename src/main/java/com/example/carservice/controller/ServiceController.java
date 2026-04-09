package com.example.carservice.controller;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.exception.ApiError;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.ServiceInterface;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@Tag(name = "Services", description = "API for managing service catalog")
public class ServiceController {

  private final ServiceInterface service;

  @Operation(summary = "Get all services")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping("/all")
  public ResponseEntity<List<ServiceDto>> getAllServices() {
    return ResponseEntity.ok(service.getAllServices());
  }

  @Operation(summary = "Get service by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "404",
          description = "Service not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping("/{id}")
  public ResponseEntity<ServiceDto> getServiceById(@PathVariable Long id) {
    ServiceDto serviceDto = service.getServiceById(id);
    if (serviceDto == null) {
      throw new ResourceNotFoundException("Service not found with id: " + id);
    }
    return ResponseEntity.ok(serviceDto);
  }

  @Operation(summary = "Get services by category")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Invalid category parameter",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping
  public ResponseEntity<List<ServiceDto>> getServicesByParams(
      @RequestParam(required = false) String category) {

    if (category != null) {
      return ResponseEntity.ok(service.getServicesByCategory(category));
    }
    return ResponseEntity.ok(service.getAllServices());
  }
}