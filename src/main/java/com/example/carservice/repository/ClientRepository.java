package com.example.carservice.repository;

import com.example.carservice.model.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

  List<Client> findByLastName(String lastName);

  Optional<Client> findByPhone(String phone);

  Optional<Client> findByEmail(String email);


  List<Client> findByFirstNameAndLastName(String firstName, String lastName);
}