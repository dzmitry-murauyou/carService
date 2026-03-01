package com.example.carservice.controller;

import com.example.carservice.dto.SpareDto;
import com.example.carservice.service.SpareService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/spares")
@RequiredArgsConstructor
public class SpareController {

  private final SpareService spareService;

  @GetMapping
  public List<SpareDto> getAllSpares() {
    return spareService.getAllSpares();
  }

  @GetMapping("/{id}")
  public SpareDto getSpareById(@PathVariable Long id) {
    return spareService.getSpareById(id);
  }

  @GetMapping("/part/{partNumber}")
  public SpareDto getSpareByPartNumber(@PathVariable String partNumber) {
    return spareService.getSpareByPartNumber(partNumber);
  }

  @GetMapping("/manufacturer/{manufacturer}")
  public List<SpareDto> getSparesByManufacturer(@PathVariable String manufacturer) {
    return spareService.getSparesByManufacturer(manufacturer);
  }

  @GetMapping("/low-stock")
  public List<SpareDto> getLowStockSpares(@RequestParam(defaultValue = "5") Integer minQuantity) {
    return spareService.getLowStockSpares(minQuantity);
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public SpareDto createSpare(@RequestBody SpareDto spareDto) {
    return spareService.createSpare(spareDto);
  }

  @PutMapping("/{id}")
  public SpareDto updateSpare(@PathVariable Long id, @RequestBody SpareDto spareDto) {
    return spareService.updateSpare(id, spareDto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteSpare(@PathVariable Long id) {
    spareService.deleteSpare(id);
  }
}