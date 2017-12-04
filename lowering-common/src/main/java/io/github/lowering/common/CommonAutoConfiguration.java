package io.github.lowering.common;

import feign.RequestInterceptor;
import io.github.lowering.common.oauth.listener.OAuth2SsoListener;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.bus.jackson.RemoteApplicationEventScan;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;

@Configuration
@ServletComponentScan
public class CommonAutoConfiguration {

    @Configuration
    @ConditionalOnClass(name = "org.springframework.security.oauth2.provider.OAuth2Authentication")
    @RemoteApplicationEventScan
    protected static class OAuth2SsoConfiguration {

        @Bean
        @ConditionalOnMissingBean(OAuth2SsoListener.class)
        public OAuth2SsoListener oauth2SsoListener(){
            return new OAuth2SsoListener();
        }
    }

    @Configuration
    @ConditionalOnClass(FeignClient.class)
    protected static class CustomFeignClientsConfiguration {

        @Bean
        @ConfigurationProperties(prefix = "security.oauth2.client")
        public ClientCredentialsResourceDetails clientCredentialsResourceDetails() {
            return new ClientCredentialsResourceDetails();
        }

        @Bean
        public RequestInterceptor oauth2FeignRequestInterceptor(){
            return new OAuth2FeignRequestInterceptor(new DefaultOAuth2ClientContext(), clientCredentialsResourceDetails());
        }
    }

}
