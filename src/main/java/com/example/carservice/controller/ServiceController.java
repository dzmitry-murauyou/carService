package com.example.carservice.controller;

import com.example.carservice.dto.ServiceDto;
import com.example.carservice.dto.mapper.ServiceMapper;
import com.example.carservice.model.ServiceEntity;
import com.example.carservice.service.ServiceInterface;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceInterface service;
    private final ServiceMapper mapper;

    public ServiceController(ServiceInterface service, ServiceMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping("/all")
    public List<ServiceDto> getAllServices() {
        return service.getAllServices().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ServiceDto getServiceById(@PathVariable Long id) {
        ServiceEntity entity = service.getServiceById(id);
        if (entity == null) {
            return null;
        }
        return mapper.toDto(entity);
    }
}