package com.ecom.E_Commerce.Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalTime;

@SpringBootApplication
public class ECommerceBackendApplication {

	public static void main(String[] args) {

        SpringApplication.run(ECommerceBackendApplication.class, args);
        System.out.println("\n\nstart\t"+ LocalTime.now());

	}

}
