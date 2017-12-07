package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "roles")
public class Role extends Id {

    public interface WithoutRelationJView extends JView {};

    @Column(length = 100, unique = true, nullable = false)
    @JsonView(WithoutRelationJView.class)
    private String constant;

    @Column(length = 300)
    @JsonView(WithoutRelationJView.class)
    private String description;

    @JsonView(WithoutRelationJView.class)
    private Boolean enabled;

    @Column(length = 100, unique = true, nullable = false)
    @JsonView(WithoutRelationJView.class)
    private String rolename;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "roles_menus",
            joinColumns = {
                    @JoinColumn(name = "role_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "menu_id")
            }
    )
    private Set<Menu> menus = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "roles_authorities",
            joinColumns = {
                    @JoinColumn(name = "role_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "authority_id")
            }
    )
    private Set<Authority> authorities = new HashSet<>();

    public String getConstant() {
        return constant;
    }

    public void setConstant(String constant) {
        this.constant = constant;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getRolename() {
        return rolename;
    }

    public void setRolename(String rolename) {
        this.rolename = rolename;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<Menu> getMenus() {
        return menus;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }
}
