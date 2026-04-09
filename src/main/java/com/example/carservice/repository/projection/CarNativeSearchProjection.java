package com.example.carservice.repository.projection;

public interface CarNativeSearchProjection {

  Long getId();

  Long getBrandModelId();

  String getBrand();

  String getModel();

  String getLicensePlate();

  String getVin();

  Integer getYear();

  Long getClientId();

  String getClientName();
}