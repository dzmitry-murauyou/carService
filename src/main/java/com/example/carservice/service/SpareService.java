package com.example.carservice.service;

import com.example.carservice.dto.SpareDto;
import java.util.List;

public interface SpareService {

  List<SpareDto> getAllSpares();

  SpareDto getSpareById(Long id);

  SpareDto getSpareByPartNumber(String partNumber);

  List<SpareDto> getSparesByManufacturer(String manufacturer);

  List<SpareDto> getLowStockSpares(Integer minQuantity);

  SpareDto createSpare(SpareDto spareDto);

  SpareDto updateSpare(Long id, SpareDto spareDto);

  void deleteSpare(Long id);
}