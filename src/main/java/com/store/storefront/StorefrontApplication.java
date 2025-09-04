package com.store.storefront;

import com.store.storefront.utils.EnvLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StorefrontApplication {


	public static void main(String[] args) {
		EnvLoader.load();

		SpringApplication.run(StorefrontApplication.class, args);
	}

}
