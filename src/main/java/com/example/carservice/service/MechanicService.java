package com.example.carservice.service;

import com.example.carservice.dto.MechanicDto;
import java.util.List;

public interface MechanicService {

  List<MechanicDto> getAllMechanics();

  MechanicDto getMechanicById(Long id);

  List<MechanicDto> getMechanicsBySpecialization(String specialization);

  MechanicDto createMechanic(MechanicDto mechanicDto);

  MechanicDto updateMechanic(Long id, MechanicDto mechanicDto);

  void deleteMechanic(Long id);
}