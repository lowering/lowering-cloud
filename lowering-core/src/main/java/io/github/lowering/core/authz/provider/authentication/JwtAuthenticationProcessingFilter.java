package io.github.lowering.core.authz.provider.authentication;

import io.github.lowering.core.authz.common.exception.JwtException;
import io.github.lowering.core.authz.provider.error.JwtAuthenticationEntryPoint;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.util.Assert;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationProcessingFilter implements Filter, InitializingBean {

    private final static Log logger = LogFactory.getLog(JwtAuthenticationProcessingFilter.class);

    private AuthenticationEntryPoint authenticationEntryPoint = new JwtAuthenticationEntryPoint();

    private AuthenticationManager authenticationManager;

    private JwtTokenExtractor tokenExtractor = new JwtTokenExtractor();

    private AuthenticationEventPublisher eventPublisher = new NullEventPublisher();

    private boolean stateless = true;

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void setStateless(boolean stateless) {
        this.stateless = stateless;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        final boolean debug = logger.isDebugEnabled();
        final HttpServletRequest request = (HttpServletRequest) req;
        final HttpServletResponse response = (HttpServletResponse) resp;

        try {

            Authentication authentication = tokenExtractor.extract(request);

            if (authentication == null) {
                if (stateless && isAuthenticated()) {
                    if (debug) {
                        logger.debug("Clearing security context.");
                    }
                    SecurityContextHolder.clearContext();
                }
                if (debug) {
                    logger.debug("No token in request, will continue chain.");
                }
            }
            else {
                request.setAttribute("ACCESS_TOKEN_VALUE", authentication.getPrincipal());
                if (authentication instanceof AbstractAuthenticationToken) {
                    AbstractAuthenticationToken needsDetails = (AbstractAuthenticationToken) authentication;
                    //needsDetails.setDetails(authenticationDetailsSource.buildDetails(request));
                }
                Authentication authResult = authenticationManager.authenticate(authentication);

                if (debug) {
                    logger.debug("Authentication success: " + authResult);
                }

                eventPublisher.publishAuthenticationSuccess(authResult);

                SecurityContextHolder.getContext().setAuthentication(authResult);

            }
        } catch (JwtException failed) {
            SecurityContextHolder.clearContext();

            if (debug) {
                logger.debug("Authentication request failed: " + failed);
            }
            eventPublisher.publishAuthenticationFailure(new BadCredentialsException(failed.getMessage(), failed), new PreAuthenticatedAuthenticationToken("access-token", "N/A"));

            authenticationEntryPoint.commence(request, response, new InsufficientAuthenticationException(failed.getMessage(), failed));

            return;
        }

        chain.doFilter(request, response);
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            return false;
        }
        return true;
    }

    @Override
    public void destroy() {

    }

    @Override
    public void afterPropertiesSet() throws Exception {
        Assert.state(authenticationManager != null, "AuthenticationManager is required");
    }

    private static final class NullEventPublisher implements AuthenticationEventPublisher {

        public void publishAuthenticationFailure(AuthenticationException exception, Authentication authentication) { }

        public void publishAuthenticationSuccess(Authentication authentication) { }
    }
}
