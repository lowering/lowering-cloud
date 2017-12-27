package io.github.lowering.account;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.*;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableDiscoveryClient
@EnableResourceServer
public class LoweringAccountApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoweringAccountApplication.class, args);
	}

	@Configuration
	@EnableFeignClients
	protected static class FeignClientConfiguration { }

	@Configuration
	@EnableJpaRepositories
	@EnableTransactionManagement
	protected static class RepositoryConfiguration { }

	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
		private static final Logger logger = LoggerFactory.getLogger(io.github.lowering.account.LoweringAccountApplication.WebSecurityConfiguration.class);


		@Autowired
		private UserDetailsService userDetailsService;

		@PostConstruct
		public void init() {
			logger.info("初始化");
		}


		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
					.authorizeRequests()
					.anyRequest().authenticated()
					.and().csrf().disable();
		}

		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
			auth.userDetailsService(userDetailsService);
		}

		@Override
		@Bean("authenticationManager")
		public AuthenticationManager authenticationManagerBean() throws Exception {
			return super.authenticationManagerBean();
		}
	}

	@Configuration
	@EnableAuthorizationServer
	protected static class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {
		private static final Logger logger = LoggerFactory.getLogger(io.github.lowering.account.LoweringAccountApplication.AuthorizationServerConfiguration.class);


		@Autowired
		private AuthenticationManager authenticationManager;

		@Autowired
		private UserDetailsService userDetailsService;

		@PostConstruct
		public void init() {
			logger.info("初始化");
		}

		@Override
		public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
			endpoints
					.pathMapping("/oauth/token","/oauth/login")
					.authenticationManager(authenticationManager)
					.userDetailsService(userDetailsService);
		}

		@Override
		public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
			security
					.checkTokenAccess("isAuthenticated()")
					.tokenKeyAccess("permitAll()");
		}

		@Override
		public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
			clients.inMemory()
					.withClient("ui")
					.secret("ui")
					.authorizedGrantTypes("refresh_token", "password")
					.scopes("ui")
					.and()
					.withClient("account")
					.secret("account")
					.authorizedGrantTypes("client_credentials", "refresh_token")
					.scopes("server")
					.and()
					.withClient("gateway")
					.secret("gateway")
					.authorizedGrantTypes("client_credentials", "refresh_token")
					.scopes("server");
		}
	}
}
