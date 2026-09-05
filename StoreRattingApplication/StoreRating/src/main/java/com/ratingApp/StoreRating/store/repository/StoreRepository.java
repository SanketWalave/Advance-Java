package com.ratingApp.StoreRating.store.repository;

import com.ratingApp.StoreRating.store.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {
    List<Store> findByOwnerId(Long ownerId);
    boolean existsByOwnerIdAndIdNot(Long ownerId, Long id);
}