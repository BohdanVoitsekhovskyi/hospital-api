package com.example.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class HospitalApiApplication implements CommandLineRunner {


    public static void main(String[] args) {
		SpringApplication.run(HospitalApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Hospital Api Application started successfully");
	}
}
