package com.ratingApp.StoreRating.auth.model.dto;

import com.ratingApp.StoreRating.auth.model.User;

public record RegisterRequest(String name, String email, String password, User.Role userType) {}