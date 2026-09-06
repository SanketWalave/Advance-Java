package com.ratingApp.StoreRating.location.service;

import com.ratingApp.StoreRating.location.dto.LocationRequestDto;
import com.ratingApp.StoreRating.location.dto.LocationResponseDto;
import com.ratingApp.StoreRating.location.model.Location;
import com.ratingApp.StoreRating.location.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationResponseDto create(LocationRequestDto req) {
        if (locationRepository.existsByCityAndStateAndCountry(req.getCity(), req.getState(), req.getCountry())) {
            throw new IllegalArgumentException("Location already exists");
        }
        Location location = new Location();
        location.setCity(req.getCity());
        location.setState(req.getState());
        location.setCountry(req.getCountry());

        Location saved = locationRepository.save(location);
        return toDto(saved);
    }

    public List<LocationResponseDto> getAll() {
        return locationRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    public LocationResponseDto getById(Long id) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Location not found: " + id));
        return toDto(location);
    }

    public LocationResponseDto update(Long id, LocationRequestDto req) {
        Location location = locationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Location not found: " + id));

        location.setCity(req.getCity());
        location.setState(req.getState());
        location.setCountry(req.getCountry());

        Location updated = locationRepository.save(location);
        return toDto(updated);
    }

    public void delete(Long id) {
        if (!locationRepository.existsById(id)) {
            throw new IllegalArgumentException("Location not found: " + id);
        }
        locationRepository.deleteById(id);
    }

    private LocationResponseDto toDto(Location location) {
        return new LocationResponseDto(
                location.getId(),
                location.getCity(),
                location.getState(),
                location.getCountry()
        );
    }
}