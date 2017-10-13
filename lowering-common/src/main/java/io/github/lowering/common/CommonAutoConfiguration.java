package io.github.lowering.common;

import io.github.lowering.common.oauth.listener.OAuth2SsoListener;
import io.github.lowering.common.session.SessionContextHolder;
import io.github.lowering.common.session.listener.HttpSessionBindingListener;
import io.github.lowering.common.session.listener.HttpSessionCreatedListener;
import io.github.lowering.common.session.listener.HttpSessionDestroyedListener;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cloud.bus.jackson.RemoteApplicationEventScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.session.HttpSessionCreatedEvent;
import org.springframework.security.web.session.HttpSessionDestroyedEvent;

import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionIdListener;
import java.util.Objects;

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
    protected static class SessionContextConfiguration {

        @Bean
        public SessionContextHolder sessionContextHolder(){
            return SessionContextHolder.getInstance();
        }

        @Bean
        public HttpSessionBindingListener httpSessionBindingListener(){
            return new HttpSessionBindingListener();
        }
        @Bean
        public HttpSessionCreatedListener httpSessionCreatedListener(){
            return new HttpSessionCreatedListener();
        }
        @Bean
        public HttpSessionDestroyedListener httpSessionDestroyedListener(){
            return new HttpSessionDestroyedListener();
        }

    }




}
