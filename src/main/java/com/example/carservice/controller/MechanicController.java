package com.example.carservice.controller;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.exception.ApiError;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.MechanicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mechanics")
@RequiredArgsConstructor
@Tag(name = "Mechanics", description = "API for managing mechanics")
public class MechanicController {

  private final MechanicService mechanicService;

  @Operation(summary = "Get all mechanics")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "500",
          description = "Internal server error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      )
  })
  @GetMapping
  public ResponseEntity<List<MechanicDto>> getAllMechanics() {
    return ResponseEntity.ok(mechanicService.getAllMechanics());
  }

  @Operation(summary = "Get mechanic by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "404",
          description = "Mechanic not found",
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
  public ResponseEntity<MechanicDto> getMechanicById(@PathVariable Long id) {
    MechanicDto mechanic = mechanicService.getMechanicById(id);
    if (mechanic == null) {
      throw new ResourceNotFoundException("Mechanic not found with id: " + id);
    }
    return ResponseEntity.ok(mechanic);
  }

  @Operation(summary = "Create new mechanic")
  @ApiResponses({
      @ApiResponse(responseCode = "201", description = "Created"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate phone or other unique constraint)",
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
  @PostMapping
  public ResponseEntity<MechanicDto> createMechanic(@Valid @RequestBody MechanicDto mechanicDto) {
    MechanicDto created = mechanicService.createMechanic(mechanicDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @Operation(summary = "Update mechanic by id")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "OK"),
      @ApiResponse(
          responseCode = "400",
          description = "Validation error",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "404",
          description = "Mechanic not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (duplicate phone or other unique constraint)",
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
  @PutMapping("/{id}")
  public ResponseEntity<MechanicDto> updateMechanic(
      @PathVariable Long id,
      @Valid @RequestBody MechanicDto mechanicDto
  ) {
    MechanicDto updated = mechanicService.updateMechanic(id, mechanicDto);
    if (updated == null) {
      throw new ResourceNotFoundException("Mechanic not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Delete mechanic by id")
  @ApiResponses({
      @ApiResponse(responseCode = "204", description = "No Content"),
      @ApiResponse(
          responseCode = "404",
          description = "Mechanic not found",
          content = @Content(mediaType = "application/json",
              schema = @Schema(implementation = ApiError.class))
      ),
      @ApiResponse(
          responseCode = "409",
          description = "Conflict (data integrity / foreign key / etc.)",
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
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMechanic(@PathVariable Long id) {
    mechanicService.deleteMechanic(id);
    return ResponseEntity.noContent().build();
  }
}