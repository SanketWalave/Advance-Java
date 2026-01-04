package com.ratingApp.StoreRating.model.dto;

public record UseDto(
        Integer id,
        String name,
        String email,
        String imagePath,
        String password,
        String userType

) {
}
