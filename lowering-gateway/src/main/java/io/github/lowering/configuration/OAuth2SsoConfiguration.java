package io.github.lowering.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2SsoProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.util.ClassUtils;

@Configuration
@EnableOAuth2Sso
public class OAuth2SsoConfiguration extends WebSecurityConfigurerAdapter implements Ordered {

    //@Autowired
    private ConsumerTokenServices tokenServices;

    private final ApplicationContext applicationContext;

    private final OAuth2SsoProperties sso;

    public OAuth2SsoConfiguration(ApplicationContext applicationContext, OAuth2SsoProperties sso) {
        this.applicationContext = applicationContext;
        this.sso = sso;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**").authorizeRequests().anyRequest().authenticated();
        http.logout().addLogoutHandler((request, response, authentication) -> {
            Object details = authentication.getDetails();
            if (details instanceof OAuth2AuthenticationDetails){
                OAuth2AuthenticationDetails detail = OAuth2AuthenticationDetails.class.cast(details);
                String token = detail.getTokenType();
                //tokenServices.revokeToken(token);
            }
        }).clearAuthentication(true).invalidateHttpSession(true);
        new OAuth2SsoSecurityConfigurer(this.applicationContext).configure(http);
    }

    @Override
    public int getOrder() {
        if (this.sso.getFilterOrder() != null) {
            return this.sso.getFilterOrder();
        }
        if (ClassUtils.isPresent(
                "org.springframework.boot.actuate.autoconfigure.ManagementServerProperties",
                null)) {
            return SecurityProperties.ACCESS_OVERRIDE_ORDER - 5;
        }
        return SecurityProperties.ACCESS_OVERRIDE_ORDER;
    }
}
