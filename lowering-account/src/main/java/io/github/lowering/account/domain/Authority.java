package io.github.lowering.account.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "authorities")
public class Authority extends Id {

    @Column(nullable = false,length = 100)
    private String name;
    @Column(unique = true,nullable = false,length = 200)
    private String constant;
    private Boolean enabled;
    @Column(length = 300)
    private String description;

    @ManyToOne
    @JoinColumn(name = "menu_id")
    private Menu menu;

    @ManyToMany(mappedBy = "authorities")
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

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Menu getMenu() {
        return menu;
    }

    public void setMenu(Menu menu) {
        this.menu = menu;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
