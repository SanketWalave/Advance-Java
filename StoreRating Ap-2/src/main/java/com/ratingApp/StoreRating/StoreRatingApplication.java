package com.ratingApp.StoreRating;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class StoreRatingApplication {

	public static void main(String[] args) {

        SpringApplication.run(StoreRatingApplication.class, args);
        System.out.println("\nStore Rating Application is running..."+ LocalDate.now());
	}

}
