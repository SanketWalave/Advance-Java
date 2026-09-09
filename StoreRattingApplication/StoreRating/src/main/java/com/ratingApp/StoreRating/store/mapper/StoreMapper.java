package com.ratingApp.StoreRating.store.mapper;

import com.ratingApp.StoreRating.location.model.Location;
import com.ratingApp.StoreRating.store.dto.StoreRequest;
import com.ratingApp.StoreRating.store.dto.StoreResponse;
import com.ratingApp.StoreRating.store.model.Store;

import java.math.BigDecimal;

public class StoreMapper {

    private StoreMapper() {} // static utility — no instances

    public static Store toEntity(StoreRequest req, Location location) {
        Store store = new Store();
        store.setName(req.name());
        store.setEmail(req.email());
        store.setAddress(req.address());
        store.setLocation(location);
        return store;
    }

    public static StoreResponse toDto(Store store) {
        return new StoreResponse(
                store.getId(),
                store.getName(),
                store.getEmail(),
                store.getAddress(),
                store.getAverageRating() != null ? store.getAverageRating() : BigDecimal.ZERO,
               store.getOwner() != null ? store.getOwner().getId() : null,
                store.getLocation()
        );
    }
}