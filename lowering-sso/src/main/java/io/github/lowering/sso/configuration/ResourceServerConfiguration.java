package io.github.lowering.sso.configuration;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
	private static final Logger logger = LoggerFactory.getLogger(ResourceServerConfiguration.class);
	
	@PostConstruct
	public void init() {
		logger.info("初始化");
	}
}
