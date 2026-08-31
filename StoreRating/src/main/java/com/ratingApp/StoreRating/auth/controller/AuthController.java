package com.ratingApp.StoreRating.auth.controller;

import com.ratingApp.StoreRating.auth.model.User;
import com.ratingApp.StoreRating.auth.model.dto.*;
import com.ratingApp.StoreRating.auth.repository.UserRepository;
import com.ratingApp.StoreRating.auth.security.JwtUtil;
import com.ratingApp.StoreRating.auth.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;



    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            return ResponseEntity.badRequest().body("Email already in use");
        }
        User user = new User();
        user.setName(req.name());
        user.setEmail(req.email());
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setUserType(req.userType());
        userRepository.save(user);
        return ResponseEntity.ok("Registered");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.email(), req.password()));

        UserPrincipal principal = new UserPrincipal(
                userRepository.findByEmail(req.email()).orElseThrow());

        String token = jwtUtil.generateToken(principal);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}