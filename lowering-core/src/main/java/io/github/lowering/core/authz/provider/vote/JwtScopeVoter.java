package io.github.lowering.core.authz.provider.vote;

import io.github.lowering.core.authz.common.exception.InsufficientScopeException;
import io.github.lowering.core.authz.provider.JwtAuthentication;
import io.github.lowering.core.authz.provider.JwtRequest;
import org.springframework.security.access.AccessDecisionVoter;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.core.Authentication;

import java.util.Collection;
import java.util.Collections;
import java.util.Set;

public class JwtScopeVoter implements AccessDecisionVoter<Object> {

    private String scopePrefix = "SCOPE_";

    private String denyAccess = "DENY_JWT";

    private boolean throwException = true;


    public void setThrowException(boolean throwException) {
        this.throwException = throwException;
    }


    public void setScopePrefix(String scopePrefix) {
        this.scopePrefix = scopePrefix;
    }


    public void setDenyAccess(String denyAccess) {
        this.denyAccess = denyAccess;
    }

    public boolean supports(ConfigAttribute attribute) {
        if (denyAccess.equals(attribute.getAttribute()) || (attribute.getAttribute() != null) && attribute.getAttribute().startsWith(scopePrefix)) {
            return true;
        }
        else {
            return false;
        }
    }


    public boolean supports(Class<?> clazz) {
        return true;
    }

    public int vote(Authentication authentication, Object object, Collection<ConfigAttribute> attributes) {

        int result = ACCESS_ABSTAIN;

        if (!(authentication instanceof JwtAuthentication)) {
            return result;

        }

        for (ConfigAttribute attribute : attributes) {
            if (denyAccess.equals(attribute.getAttribute())) {
                return ACCESS_DENIED;
            }
        }

        JwtRequest clientAuthentication = ((JwtAuthentication) authentication).getJwtRequest();

        for (ConfigAttribute attribute : attributes) {
            if (this.supports(attribute)) {
                result = ACCESS_DENIED;

                Set<String> scopes = clientAuthentication.getScope();
                for (String scope : scopes) {
                    if (attribute.getAttribute().toUpperCase().equals((scopePrefix + scope).toUpperCase())) {
                        return ACCESS_GRANTED;
                    }
                }
                if (result == ACCESS_DENIED && throwException) {
                    InsufficientScopeException failure = new InsufficientScopeException("Insufficient scope for this resource", Collections.singleton(attribute.getAttribute().substring(scopePrefix.length())));
                    throw new AccessDeniedException(failure.getMessage(), failure);
                }
            }
        }

        return result;
    }
}
