package com.ratingApp.StoreRating.auth.controller;

import com.ratingApp.StoreRating.auth.model.User;
import com.ratingApp.StoreRating.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;


    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}