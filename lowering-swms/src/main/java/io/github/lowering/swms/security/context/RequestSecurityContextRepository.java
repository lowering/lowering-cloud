package io.github.lowering.swms.security.context;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.authentication.AuthenticationTrustResolverImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SaveContextOnUpdateOrErrorResponseWrapper;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.util.Assert;
import org.springframework.util.ClassUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.AsyncContext;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class RequestSecurityContextRepository implements SecurityContextRepository{
    /**
     * The default key under which the security context will be stored in the session.
     */
    public static final String SPRING_SECURITY_CONTEXT_KEY = "SPRING_SECURITY_CONTEXT";

    protected final Log logger = LogFactory.getLog(this.getClass());

    /**
     * SecurityContext instance used to check for equality with default (unauthenticated)
     * content
     */
    private final Object contextObject = SecurityContextHolder.createEmptyContext();
    private boolean allowSessionCreation = true;
    private boolean disableUrlRewriting = false;
    private boolean isServlet3 = ClassUtils.hasMethod(ServletRequest.class, "startAsync");
    private String springSecurityContextKey = SPRING_SECURITY_CONTEXT_KEY;

    private AuthenticationTrustResolver trustResolver = new AuthenticationTrustResolverImpl();
    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        HttpServletRequest request = requestResponseHolder.getRequest();
        HttpServletResponse response = requestResponseHolder.getResponse();

        SecurityContext context = readSecurityContextFromRequest(request);

        if (context == null) {
            if (logger.isDebugEnabled()) {
                logger.debug("No SecurityContext was available from the HttpServletRequest: "
                        + request + ". " + "A new one will be created.");
            }
            context = generateNewContext();

        }

        RequestSecurityContextRepository.SaveToRequestResponseWrapper wrappedResponse = new RequestSecurityContextRepository.SaveToRequestResponseWrapper(
                response, request,  context);
        requestResponseHolder.setResponse(wrappedResponse);

        if (isServlet3) {
            requestResponseHolder.setRequest(new RequestSecurityContextRepository.Servlet3SaveToRequestWrapper(request,wrappedResponse));
        }

        return context;
    }

    @Override
    public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {
        SaveContextOnUpdateOrErrorResponseWrapper responseWrapper = WebUtils.getNativeResponse(response, SaveContextOnUpdateOrErrorResponseWrapper.class);
        if (responseWrapper == null) {
            throw new IllegalStateException(
                    "Cannot invoke saveContext on response "
                            + response
                            + ". You must use the HttpRequestResponseHolder.response after invoking loadContext");
        }
        // saveContext() might already be called by the response wrapper
        // if something in the chain called sendError() or sendRedirect(). This ensures we
        // only call it
        // once per request.
        if (!responseWrapper.isContextSaved()) {
            if (responseWrapper instanceof RequestSecurityContextRepository.SaveToRequestResponseWrapper){
                RequestSecurityContextRepository.SaveToRequestResponseWrapper.class.cast(responseWrapper).saveContext(context);
            }

        }
    }

    @Override
    public boolean containsContext(HttpServletRequest request) {
        return request.getAttribute(springSecurityContextKey) != null;
    }

    private SecurityContext readSecurityContextFromRequest(HttpServletRequest request) {
        final boolean debug = logger.isDebugEnabled();


        // Session exists, so try to obtain a context from it.

        Object contextFromRequest = request.getAttribute(springSecurityContextKey);

        if (contextFromRequest == null) {
            if (debug) {
                logger.debug("HttpServletRequest returned null object for SPRING_SECURITY_CONTEXT");
            }

            return null;
        }

        // We now have the security context object from the session.
        if (!(contextFromRequest instanceof SecurityContext)) {
            if (logger.isWarnEnabled()) {
                logger.warn(springSecurityContextKey
                        + " did not contain a SecurityContext but contained: '"
                        + contextFromRequest
                        + "'; are you improperly modifying the HttpServletRequest directly "
                        + "(you should always use SecurityContextHolder) or using the HttpServletRequest attribute "
                        + "reserved for this class?");
            }

            return null;
        }

        if (debug) {
            logger.debug("Obtained a valid SecurityContext from "
                    + springSecurityContextKey + ": '" + contextFromRequest + "'");
        }

        // Everything OK. The only non-null return from this method.

        return (SecurityContext) contextFromRequest;
    }

    /**
     * By default, calls {@link SecurityContextHolder#createEmptyContext()} to obtain a
     * new context (there should be no context present in the holder when this method is
     * called). Using this approach the context creation strategy is decided by the
     * {@link SecurityContextHolderStrategy} in use. The default implementations will
     * return a new <tt>SecurityContextImpl</tt>.
     *
     * @return a new SecurityContext instance. Never null.
     */
    protected SecurityContext generateNewContext() {
        return SecurityContextHolder.createEmptyContext();
    }

    /**
     * Allows the use of session identifiers in URLs to be disabled. Off by default.
     *
     * @param disableUrlRewriting set to <tt>true</tt> to disable URL encoding methods in
     * the response wrapper and prevent the use of <tt>jsessionid</tt> parameters.
     */
    public void setDisableUrlRewriting(boolean disableUrlRewriting) {
        this.disableUrlRewriting = disableUrlRewriting;
    }

    /**
     * Allows the session attribute name to be customized for this repository instance.
     *
     * @param springSecurityContextKey the key under which the security context will be
     * stored. Defaults to {@link #SPRING_SECURITY_CONTEXT_KEY}.
     */
    public void setSpringSecurityContextKey(String springSecurityContextKey) {
        Assert.hasText(springSecurityContextKey,
                "springSecurityContextKey cannot be empty");
        this.springSecurityContextKey = springSecurityContextKey;
    }

    // ~ Inner Classes
    // ==================================================================================================

    private static class Servlet3SaveToRequestWrapper extends HttpServletRequestWrapper {
        private final SaveContextOnUpdateOrErrorResponseWrapper response;

        public Servlet3SaveToRequestWrapper(HttpServletRequest request, SaveContextOnUpdateOrErrorResponseWrapper response) {
            super(request);
            this.response = response;
        }

        @Override
        public AsyncContext startAsync() {
            response.disableSaveOnResponseCommitted();
            return super.startAsync();
        }

        @Override
        public AsyncContext startAsync(ServletRequest servletRequest, ServletResponse servletResponse) throws IllegalStateException {
            response.disableSaveOnResponseCommitted();
            return super.startAsync(servletRequest, servletResponse);
        }
    }

    /**
     * Wrapper that is applied to every request/response to update the
     * <code>HttpSession<code> with
     * the <code>SecurityContext</code> when a <code>sendError()</code> or
     * <code>sendRedirect</code> happens. See SEC-398.
     * <p>
     * Stores the necessary state from the start of the request in order to make a
     * decision about whether the security context has changed before saving it.
     */
    final class SaveToRequestResponseWrapper extends SaveContextOnUpdateOrErrorResponseWrapper {

        private final HttpServletRequest request;
        private final SecurityContext contextBeforeExecution;
        private final Authentication authBeforeExecution;


        SaveToRequestResponseWrapper(HttpServletResponse response,
                                     HttpServletRequest request,
                                     SecurityContext context) {
            super(response, disableUrlRewriting);
            this.request = request;
            this.contextBeforeExecution = context;
            this.authBeforeExecution = context.getAuthentication();
        }

        /**
         * Stores the supplied security context in the session (if available) and if it
         * has changed since it was set at the start of the request. If the
         * AuthenticationTrustResolver identifies the current user as anonymous, then the
         * context will not be stored.
         *
         * @param context the context object obtained from the SecurityContextHolder after
         * the request has been processed by the filter chain.
         * SecurityContextHolder.getContext() cannot be used to obtain the context as it
         * has already been cleared by the time this method is called.
         *
         */
        @Override
        public void saveContext(SecurityContext context) {
            final Authentication authentication = context.getAuthentication();

            // See SEC-776
            if (authentication == null || trustResolver.isAnonymous(authentication)) {
                if (logger.isDebugEnabled()) {
                    logger.debug("SecurityContext is empty or contents are anonymous - context will not be stored in HttpServletRequest.");
                }

                if (request != null && authBeforeExecution != null) {
                    // SEC-1587 A non-anonymous context may still be in the session
                    // SEC-1735 remove if the contextBeforeExecution was not anonymous
                    request.removeAttribute(springSecurityContextKey);
                }
                return;
            }


            if (request.getAttribute(springSecurityContextKey) == null) {
                request.setAttribute(springSecurityContextKey, context);

                if (logger.isDebugEnabled()) {
                    logger.debug("SecurityContext '" + context
                            + "' stored to HttpServletRequest: '" + request);
                }
            }

        }



    }

    /**
     * Sets the {@link AuthenticationTrustResolver} to be used. The default is
     * {@link AuthenticationTrustResolverImpl}.
     *
     * @param trustResolver the {@link AuthenticationTrustResolver} to use. Cannot be
     * null.
     */
    public void setTrustResolver(AuthenticationTrustResolver trustResolver) {
        Assert.notNull(trustResolver, "trustResolver cannot be null");
        this.trustResolver = trustResolver;
    }
}
