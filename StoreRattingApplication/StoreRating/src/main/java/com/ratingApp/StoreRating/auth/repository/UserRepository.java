package com.ratingApp.StoreRating.auth.repository;

import com.ratingApp.StoreRating.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    default List<User> findAllByUserType(String admin) {
        return null;
    }
}