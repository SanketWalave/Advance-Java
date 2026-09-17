package com.ratingApp.StoreRating.store.service;

import com.ratingApp.StoreRating.auth.model.User;
import com.ratingApp.StoreRating.auth.repository.UserRepository;
import com.ratingApp.StoreRating.location.dto.LocationResponseDto;
import com.ratingApp.StoreRating.location.model.Location;
import com.ratingApp.StoreRating.location.repository.LocationRepository;
import com.ratingApp.StoreRating.store.dto.StoreRequest;
import com.ratingApp.StoreRating.store.dto.StoreResponse;
import com.ratingApp.StoreRating.store.mapper.StoreMapper;
import com.ratingApp.StoreRating.store.model.Store;
import com.ratingApp.StoreRating.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final StoreMapper storeMapper;

    public StoreResponse createStore(StoreRequest req, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Location location =locationRepository.findById(req.location())
                .orElseThrow(()->new RuntimeException("location not found "));


        Store store = new Store();
        store.setName(req.name());
        store.setEmail(req.email());
        store.setAddress(req.address());
        store.setOwner(owner);
        store.setLocation(location);

        Store saved = storeRepository.save(store);
        return toResponse(saved);
    }

//    public List<StoreResponse> getAllStores() {
//        return storeRepository.findAll().stream().map(this::toResponse).toList();
//    }
public List<StoreResponse> getAllStores() {
    return storeRepository.findAll().stream()
            .map(StoreMapper::toDto)
            .toList();
}

    public StoreResponse getStoreById(Long id) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        return toResponse(store);
    }

//    public StoreResponse updateStore(Long id, StoreRequest req) {
    ////        Store store = storeRepository.findById(id)
    ////                .orElseThrow(() -> new RuntimeException("Store not found"));
    ////        Location location=locationRepository.findById(req.location())
    ////                .orElseThrow(()->new RuntimeException("location not found "));
    ////
    ////        Store updateStore=storeMapper.toEntity(Store,Location);
    ////
    ////        store.setName(req.name());
    ////        store.setEmail(req.email());
    ////        store.setAddress(req.address());
    ////        return toResponse(storeRepository.save(store));
    ////    }

    public StoreResponse updateStore(Long id, StoreRequest req) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        Location location = locationRepository.findById(req.location())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        // Fixed mapper call

        store.setName(req.name());
        store.setEmail(req.email());
        store.setAddress(req.address());
        store.setLocation(location); // Update location reference as well

        return StoreMapper.toDto(storeRepository.save(store));
    }


    public void deleteStore(Long id) {
        storeRepository.deleteById(id);
    }

    private StoreResponse toResponse(Store store) {

        LocationResponseDto location = null;

        if (store.getLocation() != null) {

            Location loc = store.getLocation();

            location = new LocationResponseDto(
                    loc.getId(),
                    loc.getCity(),
                    loc.getState(),
                    loc.getCountry()
            );
        }

        return new StoreResponse(
                store.getId(),
                store.getName(),
                store.getEmail(),
                store.getAddress(),
                store.getAverageRating(),
                store.getOwner() != null
                        ? store.getOwner().getId()
                        : null,
                location
        );
    }
}