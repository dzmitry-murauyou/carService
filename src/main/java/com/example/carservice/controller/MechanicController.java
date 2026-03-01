package com.example.carservice.controller;

import com.example.carservice.dto.MechanicDto;
import com.example.carservice.service.MechanicService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mechanics")
@RequiredArgsConstructor
public class MechanicController {

  private final MechanicService mechanicService;

  @GetMapping
  public List<MechanicDto> getAllMechanics() {
    return mechanicService.getAllMechanics();
  }

  @GetMapping("/{id}")
  public MechanicDto getMechanicById(@PathVariable Long id) {
    return mechanicService.getMechanicById(id);
  }

  @GetMapping("/specialization/{specialization}")
  public List<MechanicDto> getMechanicsBySpecialization(@PathVariable String specialization) {
    return mechanicService.getMechanicsBySpecialization(specialization);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public MechanicDto createMechanic(@RequestBody MechanicDto mechanicDto) {
    return mechanicService.createMechanic(mechanicDto);
  }

  @PutMapping("/{id}")
  public MechanicDto updateMechanic(@PathVariable Long id, @RequestBody MechanicDto mechanicDto) {
    return mechanicService.updateMechanic(id, mechanicDto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteMechanic(@PathVariable Long id) {
    mechanicService.deleteMechanic(id);
  }
}