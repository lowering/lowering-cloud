package io.github.lowering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableOAuth2Client;

@SpringBootApplication
@EnableDiscoveryClient
@EnableOAuth2Client
@EnableZuulProxy
public class LoweringGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoweringGatewayApplication.class, args);
	}
}
