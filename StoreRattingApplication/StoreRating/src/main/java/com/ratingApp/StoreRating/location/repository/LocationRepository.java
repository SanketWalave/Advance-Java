package com.ratingApp.StoreRating.location.repository;

import com.ratingApp.StoreRating.location.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {
    boolean existsByCityAndStateAndCountry(String city, String state, String country);
}