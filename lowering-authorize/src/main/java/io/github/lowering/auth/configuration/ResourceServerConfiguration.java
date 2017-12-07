package io.github.lowering.auth.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

import javax.annotation.PostConstruct;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
	private static final Logger logger = LoggerFactory.getLogger(ResourceServerConfiguration.class);
	
	@PostConstruct
	public void init() {
		logger.info("初始化");
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		super.configure(http);
		LogoutConfigurer configurer = http.getConfigurer(LogoutConfigurer.class);
		configurer.addLogoutHandler(((request, response, authentication) -> {
			System.out.println("logout123");
		}));
	}
}
