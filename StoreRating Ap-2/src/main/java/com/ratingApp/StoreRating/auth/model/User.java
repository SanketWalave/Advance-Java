package com.ratingApp.StoreRating.auth.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String imagePath;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role userType;

    public enum Role {
        ADMIN, USER, STORE_OWNER
    }
}