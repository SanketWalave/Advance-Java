package com.ratingApp.StoreRating.location.mapper;

import com.ratingApp.StoreRating.location.dto.LocationRequestDto;
import com.ratingApp.StoreRating.location.dto.LocationResponseDto;
import com.ratingApp.StoreRating.location.model.Location;

public class LocationMapper {

    private LocationMapper() {} // prevent instantiation — this is a static utility class

    public static Location toEntity(LocationRequestDto dto) {
        Location location = new Location();
        location.setCity(dto.getCity());
        location.setState(dto.getState());
        location.setCountry(dto.getCountry());
        return location;
    }

    public static LocationResponseDto toDto(Location location) {
        return new LocationResponseDto(
                location.getId(),
                location.getCity(),
                location.getState(),
                location.getCountry()
        );
    }
}