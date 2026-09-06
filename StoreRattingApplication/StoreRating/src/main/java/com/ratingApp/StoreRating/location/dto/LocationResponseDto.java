package com.ratingApp.StoreRating.location.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationResponseDto {
    private Long id;
    private String city;
    private String state;
    private String country;
}