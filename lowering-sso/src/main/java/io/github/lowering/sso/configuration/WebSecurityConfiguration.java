package io.github.lowering.sso.configuration;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	private static final Logger logger = LoggerFactory.getLogger(WebSecurityConfiguration.class);
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostConstruct
	public void init() {
		logger.info("初始化");
	}

	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		super.configure(http);
//		http.authorizeRequests().antMatchers("/test").permitAll();
		http.authorizeRequests().antMatchers("/test").permitAll()
				.anyRequest().authenticated()
				.and()
				.formLogin().and()
				.httpBasic().disable();
		http.logout();
	}

}
