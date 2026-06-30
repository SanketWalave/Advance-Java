package com.sec.Security.inMemory.auth.repository;


import com.sec.Security.inMemory.auth.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}