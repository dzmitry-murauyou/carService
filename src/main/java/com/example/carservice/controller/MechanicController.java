package com.example.carservice.controller;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.exception.ResourceNotFoundException;
import com.example.carservice.service.MechanicService;
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
public class MechanicController {

  private final MechanicService mechanicService;

  @GetMapping
  public ResponseEntity<List<MechanicDto>> getAllMechanics() {
    return ResponseEntity.ok(mechanicService.getAllMechanics());
  }

  @GetMapping("/{id}")
  public ResponseEntity<MechanicDto> getMechanicById(@PathVariable Long id) {
    MechanicDto mechanic = mechanicService.getMechanicById(id);
    if (mechanic == null) {
      throw new ResourceNotFoundException("Mechanic not found with id: " + id);
    }
    return ResponseEntity.ok(mechanic);
  }

  @GetMapping("/specialization/{specialization}")
  public ResponseEntity<List<MechanicDto>>
      getMechanicsBySpecialization(@PathVariable String specialization) {
    return ResponseEntity.ok(mechanicService.getMechanicsBySpecialization(specialization));
  }

  @PostMapping
  public ResponseEntity<MechanicDto> createMechanic(@RequestBody MechanicDto mechanicDto) {
    MechanicDto created = mechanicService.createMechanic(mechanicDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(created);
  }

  @PutMapping("/{id}")
  public ResponseEntity<MechanicDto> updateMechanic(@PathVariable Long id,
                                                    @RequestBody MechanicDto mechanicDto) {
    MechanicDto updated = mechanicService.updateMechanic(id, mechanicDto);
    if (updated == null) {
      throw new ResourceNotFoundException("Mechanic not found with id: " + id);
    }
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMechanic(@PathVariable Long id) {
    mechanicService.deleteMechanic(id);
    return ResponseEntity.noContent().build();
  }
}