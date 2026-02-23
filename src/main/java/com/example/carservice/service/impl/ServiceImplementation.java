package com.example.carservice.service.impl;

import com.example.carservice.model.ServiceEntity;
import com.example.carservice.repository.ServiceRepository;
import com.example.carservice.service.ServiceInterface;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ServiceImplementation implements ServiceInterface {

    private final ServiceRepository repository;

    public ServiceImplementation(ServiceRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<ServiceEntity> getAllServices() {
        return repository.findAll();
    }

    @Override
    public ServiceEntity getServiceById(Long id) {
        return repository.findById(id);
    }
}