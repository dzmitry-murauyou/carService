package com.example.carservice.repository;

import com.example.carservice.model.Mechanic;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MechanicRepository extends JpaRepository<Mechanic, Long> {

  List<Mechanic> findBySpecialization(String specialization);

  List<Mechanic> findByLastName(String lastName);

  List<Mechanic> findByFirstNameAndLastName(String firstName, String lastName);
}