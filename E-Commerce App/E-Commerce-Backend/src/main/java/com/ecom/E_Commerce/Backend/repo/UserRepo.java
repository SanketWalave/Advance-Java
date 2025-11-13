package com.ecom.E_Commerce.Backend.repo;

import com.ecom.E_Commerce.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Integer> {

    User getUserByEmail(String email);

    List<User> findAllByEmail(String email);
}
