package io.github.lowering.account.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "menus")
public class Menu extends Id {

    @Column(nullable = false,length = 100)
    private String name;
    private String href;
    private String target;
    private Boolean shown;
    @Column(length = 300)
    private String description;

    @ManyToOne
    @JoinColumn(name = "parent")
    private Menu parent;
    @OneToMany(mappedBy = "parent")
    private Set<Menu> children = new HashSet<>();

    @ManyToMany(mappedBy = "menus")
    private Set<Role> roles = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Boolean getShown() {
        return shown;
    }

    public void setShown(Boolean shown) {
        this.shown = shown;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Menu getParent() {
        return parent;
    }

    public void setParent(Menu parent) {
        this.parent = parent;
    }

    public Set<Menu> getChildren() {
        return children;
    }

    public void setChildren(Set<Menu> children) {
        this.children = children;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
