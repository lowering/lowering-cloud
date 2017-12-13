package io.github.lowering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

@EnableZuulProxy
@SpringBootApplication
@EnableDiscoveryClient
public class LoweringGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoweringGatewayApplication.class, args);
	}

	@Configuration
	@EnableWebSecurity
	@EnableGlobalMethodSecurity(prePostEnabled = true)
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
	protected static class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
		@Override
		protected void configure(HttpSecurity http) throws Exception {
			http
					.authorizeRequests()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
					.antMatchers("/","/account/**").permitAll()
					.anyRequest().authenticated()
					.and().csrf().disable();
		}

		@Override
		public void configure(WebSecurity web) throws Exception {
			web.ignoring().antMatchers("/webjars/**");
		}

	}

	@Configuration
	@EnableResourceServer
	@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER - 2)
	protected static class ResourceServerConfiguration extends ResourceServerConfigurerAdapter {
		@Override
		public void configure(HttpSecurity http) throws Exception {
			http
					.authorizeRequests()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
					.antMatchers("/","/account/**","/webjars/**").permitAll()
					.anyRequest().authenticated();
		}
	}

	@Configuration
	protected static class CustomCorsConfiguration {

		@Bean
		protected CorsFilter corsFilter(){
			CorsConfiguration configuration = new CorsConfiguration();
			configuration.setAllowedOrigins(Collections.singletonList("*"));
			configuration.setAllowCredentials(true);
			configuration.setAllowedHeaders(Collections.singletonList("*"));
			configuration.setAllowedMethods(Collections.singletonList("*"));
			UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
			source.registerCorsConfiguration("/**",configuration);
			return new CorsFilter(source);
		}
	}


}
