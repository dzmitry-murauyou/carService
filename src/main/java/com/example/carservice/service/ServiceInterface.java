package com.example.carservice.service;

import com.example.carservice.model.ServiceEntity;
import java.util.List;

public interface ServiceInterface {
    List<ServiceEntity> getAllServices();

    ServiceEntity getServiceById(Long id);
}