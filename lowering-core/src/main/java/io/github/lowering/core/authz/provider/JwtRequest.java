package io.github.lowering.core.authz.provider;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public class JwtRequest implements Serializable{

    private Set<String> scope = new HashSet<String>();

    public Set<String> getScope() {
        return scope;
    }

    public void setScope(Set<String> scope) {
        this.scope = scope;
    }
}
