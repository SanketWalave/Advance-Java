package com.ratingApp.StoreRating;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootApplication
public class StoreRatingApplication {

	public static void main(String[] args) {

        SpringApplication.run(StoreRatingApplication.class, args);
        System.out.println("\nStore Rating Application is running..."+ LocalDateTime.now());
	}

}
