package com.ratingApp.StoreRating.location.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationRequestDto {
    @NotBlank
    private String city;
    @NotBlank
    private String state;
    @NotBlank
    private String country;
}