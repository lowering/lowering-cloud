package io.github.lowering.swms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableOAuth2Sso
@EnableDiscoveryClient
@SpringBootApplication
public class Application {
	
	public static void main(String[] args) throws Exception {
		SpringApplication.run(Application.class, args);
	}
}
