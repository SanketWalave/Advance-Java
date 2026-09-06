package com.ratingApp.StoreRating.location.controller;

import com.ratingApp.StoreRating.location.dto.LocationRequestDto;
import com.ratingApp.StoreRating.location.dto.LocationResponseDto;
import com.ratingApp.StoreRating.location.service.LocationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('STORE_OWNER')")
    @PostMapping
    public ResponseEntity<LocationResponseDto> create(@Valid @RequestBody LocationRequestDto req) {
        return ResponseEntity.ok(locationService.create(req));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<LocationResponseDto>> getAll() {
        return ResponseEntity.ok(locationService.getAll());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<LocationResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(locationService.getById(id));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('STORE_OWNER')")
    @PutMapping("/{id}")
    public ResponseEntity<LocationResponseDto> update(@PathVariable Long id, @Valid @RequestBody LocationRequestDto req) {
        return ResponseEntity.ok(locationService.update(id, req));
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('STORE_OWNER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        locationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}