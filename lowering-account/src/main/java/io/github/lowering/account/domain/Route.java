package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "account_routes")
public class Route extends Id {

    @JsonView(WithoutRelationJView.class)
    private String name;

    @Column(unique = true)
    @JsonView(WithoutRelationJView.class)
    private String constant;

    @JsonView(WithoutRelationJView.class)
    private String path;

    @JsonView(WithoutRelationJView.class)
    private String description;

    @ManyToMany(mappedBy = "routes")
    private Set<Role> roles = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getConstant() {
        return constant;
    }

    public void setConstant(String constant) {
        this.constant = constant;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
