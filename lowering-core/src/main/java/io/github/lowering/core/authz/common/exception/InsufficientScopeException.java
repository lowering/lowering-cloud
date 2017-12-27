package io.github.lowering.core.authz.common.exception;


import java.util.Set;

public class InsufficientScopeException extends JwtException {
    public InsufficientScopeException(String msg, Set<String> scope) {

    }

}
