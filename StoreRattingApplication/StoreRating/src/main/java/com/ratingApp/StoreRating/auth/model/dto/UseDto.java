package com.ratingApp.StoreRating.auth.model.dto;

public record UseDto(
        Long id,
        String name,
        String email,
        String imagePath,
        String password,
        com.ratingApp.StoreRating.auth.model.User.Role userType

) {
}
