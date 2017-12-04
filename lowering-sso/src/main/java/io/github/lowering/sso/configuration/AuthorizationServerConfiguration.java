package io.github.lowering.sso.configuration;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfiguration extends AuthorizationServerConfigurerAdapter {
	
	private static final Logger logger = LoggerFactory.getLogger(AuthorizationServerConfiguration.class);

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostConstruct
	public void init() {
		logger.info("初始化");
	}
	
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.authenticationManager(authenticationManager);
	}
	
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.inMemory()
			        .withClient("acme")
			        .secret("acmesecret")
			        .authorizedGrantTypes("authorization_code", "refresh_token", "password")
			        .scopes("openid")
					.and()
					.withClient("swms")
			        .secret("swms")
			        .authorizedGrantTypes("authorization_code", "refresh_token", "password")
			        .scopes("openid")
					.and()
					.withClient("account")
			        .secret("account")
			        .authorizedGrantTypes("client_credentials", "refresh_token")
			        .scopes("server")
					.and()
					.withClient("sso")
					.secret("sso")
					.authorizedGrantTypes("client_credentials", "refresh_token")
					.scopes("server");
	}
	
}
