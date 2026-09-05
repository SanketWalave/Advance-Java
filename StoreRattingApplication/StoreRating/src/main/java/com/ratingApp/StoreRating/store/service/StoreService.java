package com.ratingApp.StoreRating.store.service;

import com.ratingApp.StoreRating.auth.model.User;
import com.ratingApp.StoreRating.auth.repository.UserRepository;
import com.ratingApp.StoreRating.store.dto.StoreRequest;
import com.ratingApp.StoreRating.store.dto.StoreResponse;
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

    public StoreResponse createStore(StoreRequest req, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Store store = new Store();
        store.setName(req.name());
        store.setEmail(req.email());
        store.setAddress(req.address());
        store.setOwner(owner);

        Store saved = storeRepository.save(store);
        return toResponse(saved);
    }

    public List<StoreResponse> getAllStores() {
        return storeRepository.findAll().stream().map(this::toResponse).toList();
    }

    public StoreResponse getStoreById(Long id) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        return toResponse(store);
    }

    public StoreResponse updateStore(Long id, StoreRequest req) {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found"));
        store.setName(req.name());
        store.setEmail(req.email());
        store.setAddress(req.address());
        return toResponse(storeRepository.save(store));
    }

    public void deleteStore(Long id) {
        storeRepository.deleteById(id);
    }

    private StoreResponse toResponse(Store store) {
        return new StoreResponse(
                store.getId(),
                store.getName(),
                store.getEmail(),
                store.getAddress(),
                store.getAverageRating(),
                store.getOwner() != null ? store.getOwner().getId() : null
        );
    }
}