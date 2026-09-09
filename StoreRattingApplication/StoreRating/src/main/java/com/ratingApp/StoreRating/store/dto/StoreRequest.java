package com.ratingApp.StoreRating.store.dto;

import com.ratingApp.StoreRating.location.model.Location;

public record StoreRequest(String name, String email, String address, long location) {}