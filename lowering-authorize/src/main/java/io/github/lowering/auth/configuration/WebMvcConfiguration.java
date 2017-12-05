package io.github.lowering.auth.configuration;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;

@Configuration
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
	
	private static final Logger logger = LoggerFactory.getLogger(WebMvcConfiguration.class);
	
	@PostConstruct
	public void init() {
		logger.info("初始化");
	}
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {

	}
	
}