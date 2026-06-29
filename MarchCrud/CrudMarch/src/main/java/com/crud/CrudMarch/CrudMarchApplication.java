package com.crud.CrudMarch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Time;
import java.time.LocalTime;

@SpringBootApplication
public class CrudMarchApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudMarchApplication.class, args);
        System.out.println("\n\nstart\t"+ LocalTime.now());
	}

}
