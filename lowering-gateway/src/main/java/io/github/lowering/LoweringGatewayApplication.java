package io.github.lowering;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@EnableZuulProxy
@SpringBootApplication
@EnableDiscoveryClient
public class LoweringGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoweringGatewayApplication.class, args);
	}

	@Configuration
	protected static class WebMvcConfiguration extends WebMvcConfigurerAdapter {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			super.addCorsMappings(registry);
			registry.addMapping("/*");
		}
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
					.antMatchers("/","/account/**").permitAll()
					.anyRequest().authenticated()
					.and()
					.csrf().disable();
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
					.antMatchers("/","/account/**","/webjars/**").permitAll()
					.anyRequest().authenticated();
		}
	}
}
