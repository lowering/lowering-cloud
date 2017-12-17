package io.github.lowering.common;

import feign.RequestInterceptor;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;

import java.util.Properties;

@Configuration
@ComponentScan
public class CommonAutoConfiguration {

    /**
     * 配置FeignClient调用时能获取AccessToken
     */
    @Configuration
    @ConditionalOnClass(FeignClient.class)
    protected static class CustomFeignClientsConfiguration {

        /**
         * 获取当前系统中的OAuth2信息
         * @return
         */
        @Bean
        @ConfigurationProperties(prefix = "security.oauth2.client")
        public ClientCredentialsResourceDetails clientCredentialsResourceDetails() {
            return new ClientCredentialsResourceDetails();
        }

        /**
         * 创建拦截器
         * @return
         */
        @Bean
        public RequestInterceptor oauth2FeignRequestInterceptor(){
            return new OAuth2FeignRequestInterceptor(new DefaultOAuth2ClientContext(), clientCredentialsResourceDetails());
        }
    }

    @Bean
    public ReloadableResourceBundleMessageSource messageSource(){
        ReloadableResourceBundleMessageSource source = new ReloadableResourceBundleMessageSource();
        source.setBasenames("classpath:messages/message");
        source.setDefaultEncoding("utf-8");
        source.setCacheSeconds(120);
        return source;
    }

}
