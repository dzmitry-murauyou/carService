package com.example.carservice.controller;

import com.example.carservice.dto.SpareDto;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.SpareService;
import io.swagger.v3.oas.annotations.Operation;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/spares")
@RequiredArgsConstructor
@Tag(name = "Spares", description = "API for managing spare parts")
public class SpareController {

  private final SpareService spareService;

  @Operation(summary = "Get all spare parts")
  @GetMapping
  public ResponseEntity<List<SpareDto>> getAllSpares() {
    return ResponseEntity.ok(spareService.getAllSpares());
  }

  @Operation(summary = "Get spare part by id")
  @GetMapping("/{id}")
  public ResponseEntity<SpareDto> getSpareById(@PathVariable Long id) {
    SpareDto spare = spareService.getSpareById(id);
    if (spare == null) {
      throw new ResourceNotFoundException("Spare not found with id: " + id);
    }
    return ResponseEntity.ok(spare);
  }

  @Operation(summary = "Get spare part by part number")
  @GetMapping("/part/{partNumber}")
  public ResponseEntity<SpareDto> getSpareByPartNumber(@PathVariable String partNumber) {
    SpareDto spare = spareService.getSpareByPartNumber(partNumber);
    if (spare == null) {
      throw new ResourceNotFoundException("Spare not found with part number: " + partNumber);
    }
    return ResponseEntity.ok(spare);
  }

  @Operation(summary = "Get spare parts by manufacturer")
  @GetMapping("/manufacturer/{manufacturer}")
  public ResponseEntity<List<SpareDto>> getSparesByManufacturer(@PathVariable String manufacturer) {
    return ResponseEntity.ok(spareService.getSparesByManufacturer(manufacturer));
  }

  @Operation(summary = "Get low stock spare parts")
  @GetMapping("/low-stock")
  public ResponseEntity<List<SpareDto>> getLowStockSpares(
      @RequestParam(defaultValue = "5") Integer minQuantity) {
    return ResponseEntity.ok(spareService.getLowStockSpares(minQuantity));
  }

  @Operation(summary = "Create new spare part")
  @PostMapping
  public ResponseEntity<SpareDto> createSpare(@Valid @RequestBody SpareDto spareDto) {
    SpareDto created = spareService.createSpare(spareDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @Operation(summary = "Update spare part by id")
  @PutMapping("/{id}")
  public ResponseEntity<SpareDto> updateSpare(
      @PathVariable Long id,
      @Valid @RequestBody SpareDto spareDto
  ) {
    SpareDto updated = spareService.updateSpare(id, spareDto);
    if (updated == null) {
      throw new ResourceNotFoundException("Spare not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Delete spare part by id")
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteSpare(@PathVariable Long id) {
    spareService.deleteSpare(id);
    return ResponseEntity.noContent().build();
  }
}