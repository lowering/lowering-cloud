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
@Order(-20)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	
	private static final Logger logger = LoggerFactory.getLogger(WebSecurityConfiguration.class);
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostConstruct
	public void init() {
		logger.info("初始化");
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.parentAuthenticationManager(authenticationManager);
		
		auth.inMemoryAuthentication()
			.withUser("admin").password("admin").roles("ADMIN")
			.and()
			.withUser("user").password("user").roles("USER")
			.and()
			.withUser("paul").password("emu").roles("USER");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.formLogin().loginPage("/login").permitAll()
		.and()
			.requestMatchers().antMatchers("/login", "/oauth/authorize", "/oauth/confirm_access")
		.and()
			.authorizeRequests().anyRequest().authenticated();
	}

}
