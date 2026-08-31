package com.ratingApp.StoreRating.store.security;

import com.ratingApp.StoreRating.auth.security.UserPrincipal;
import com.ratingApp.StoreRating.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service("storeSecurity")
@RequiredArgsConstructor
public class StoreSecurityService {

    private final StoreRepository storeRepository;

    public boolean isOwner(Long storeId, UserPrincipal principal) {
        return storeRepository.findById(storeId)
                .map(store -> store.getOwner() != null
                        && store.getOwner().getId().equals(principal.getUser().getId()))
                .orElse(false);
    }
}