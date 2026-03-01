package com.example.carservice.service.impl;

import com.example.carservice.dto.SpareDto;
import com.example.carservice.dto.mapper.SpareMapper;
import com.example.carservice.model.Spare;
import com.example.carservice.repository.SpareRepository;
import com.example.carservice.service.SpareService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SpareServiceImpl implements SpareService {

  private final SpareRepository repository;
  private final SpareMapper mapper;

  @Override
  public List<SpareDto> getAllSpares() {
    return repository.findAll().stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public SpareDto getSpareById(Long id) {
    return repository.findById(id)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  public SpareDto getSpareByPartNumber(String partNumber) {
    return repository.findByPartNumber(partNumber)
        .map(mapper::toDto)
        .orElse(null);
  }

  @Override
  public List<SpareDto> getSparesByManufacturer(String manufacturer) {
    return repository.findByManufacturer(manufacturer).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  public List<SpareDto> getLowStockSpares(Integer minQuantity) {
    return repository.findByQuantityInStockLessThan(minQuantity).stream()
        .map(mapper::toDto)
        .toList();
  }

  @Override
  @Transactional
  public SpareDto createSpare(SpareDto spareDto) {
    if (spareDto.getPartNumber() != null) {
      repository.findByPartNumber(spareDto.getPartNumber())
          .ifPresent(s -> {
            throw new RuntimeException("Spare with part number "
                + spareDto.getPartNumber() + " already exists");
          });
    }

    Spare entity = mapper.toEntity(spareDto);
    entity.setId(null);
    Spare saved = repository.save(entity);
    return mapper.toDto(saved);
  }

  @Override
  @Transactional
  public SpareDto updateSpare(Long id, SpareDto spareDto) {
    Spare existing = repository.findById(id)
        .orElseThrow(() -> new RuntimeException("Spare not found with id: " + id));

    existing.setName(spareDto.getName());
    existing.setPartNumber(spareDto.getPartNumber());
    existing.setPrice(spareDto.getPrice());
    existing.setQuantityInStock(spareDto.getQuantityInStock());
    existing.setManufacturer(spareDto.getManufacturer());

    Spare updated = repository.save(existing);
    return mapper.toDto(updated);
  }

  @Override
  @Transactional
  public void deleteSpare(Long id) {
    repository.deleteById(id);
  }
}