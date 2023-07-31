package com.danbi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:/property.properties")
public class DanbiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DanbiApplication.class, args);
	}

}
