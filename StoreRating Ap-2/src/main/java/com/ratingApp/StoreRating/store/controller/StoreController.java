package com.ratingApp.StoreRating.store.controller;

import com.ratingApp.StoreRating.auth.security.UserPrincipal;
import com.ratingApp.StoreRating.store.dto.StoreRequest;
import com.ratingApp.StoreRating.store.dto.StoreResponse;
import com.ratingApp.StoreRating.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @PreAuthorize("hasRole('ADMIN') or hasRole('STORE_OWNER')")
    @PostMapping
    public ResponseEntity<StoreResponse> createStore(
            @RequestBody StoreRequest req,
            @AuthenticationPrincipal UserPrincipal principal) {
        return ResponseEntity.ok(storeService.createStore(req, principal.getUser().getId()));
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<StoreResponse>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<StoreResponse> getStore(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.getStoreById(id));
    }

    @PreAuthorize("hasRole('ADMIN') or @storeSecurity.isOwner(#id, principal)")
    @PutMapping("/{id}")
    public ResponseEntity<StoreResponse> updateStore(
            @PathVariable Long id,
            @RequestBody StoreRequest req) {
        return ResponseEntity.ok(storeService.updateStore(id, req));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStore(@PathVariable Long id) {
        storeService.deleteStore(id);
        return ResponseEntity.ok().build();
    }
}