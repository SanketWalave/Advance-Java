package com.ratingApp.StoreRating.store.mapper;

import com.ratingApp.StoreRating.location.dto.LocationResponseDto;
import com.ratingApp.StoreRating.location.model.Location;
import com.ratingApp.StoreRating.store.dto.StoreRequest;
import com.ratingApp.StoreRating.store.dto.StoreResponse;
import com.ratingApp.StoreRating.store.model.Store;
import org.springframework.stereotype.Component; // Added import

import java.math.BigDecimal;

@Component // Added component annotation
public class StoreMapper {

    // StoreRequest -> Store Entity
    public Store toEntity(StoreRequest req, Location location) { // Removed static if using DI, or keep static and remove it from constructor injection in service

        Store store = new Store();

        store.setName(req.name());
        store.setEmail(req.email());
        store.setAddress(req.address());
        store.setLocation(location);

        return store;
    }

    // Store Entity -> StoreResponse
    public static StoreResponse toDto(Store store) {

        LocationResponseDto locationDto = null;

        if (store.getLocation() != null) {

            Location location = store.getLocation();

            locationDto = new LocationResponseDto(
                    location.getId(),
                    location.getCity(),
                    location.getState(),
                    location.getCountry()
            );
        }

        return new StoreResponse(
                store.getId(),
                store.getName(),
                store.getEmail(),
                store.getAddress(),

                store.getAverageRating() != null
                        ? store.getAverageRating()
                        : BigDecimal.ZERO,

                store.getOwner() != null
                        ? store.getOwner().getId()
                        : null,

                locationDto
        );
    }
}