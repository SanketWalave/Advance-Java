package com.ratingApp.StoreRating.repository;

import com.ratingApp.StoreRating.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    List<User> findAllByUserType(String admin);
}
