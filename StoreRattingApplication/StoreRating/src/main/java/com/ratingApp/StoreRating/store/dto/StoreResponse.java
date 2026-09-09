package com.ratingApp.StoreRating.store.dto;

import com.ratingApp.StoreRating.location.model.Location;

import java.math.BigDecimal;

public record StoreResponse(
        Long id,
        String name,
        String email,
        String address,
        BigDecimal averageRating,
        Long ownerId,
        Location location
) {}