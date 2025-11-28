package com.ecom.E_Commerce.Backend.model.dto;

public record UserDto(
        int userId,
        String userName,
        String userPassword,
        String userEmail,
        String imagePath,
        String userType
) {
}


