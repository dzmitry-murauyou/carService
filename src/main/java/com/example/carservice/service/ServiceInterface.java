package com.example.carservice.service;

import com.example.carservice.dto.ServiceDto;
import java.util.List;

public interface ServiceInterface {

  List<ServiceDto> getAllServices();

  ServiceDto getServiceById(Long id);

  List<ServiceDto> getServicesByCategory(String category);
}