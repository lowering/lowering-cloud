package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "authorities")
public class Authority extends Id {

    @NotNull(message = "{account.authority.name.NotNull.message}")
    @Length(min = 1, max = 100, message = "{account.authority.name.Length.message}")
    @Column(nullable = false,length = 100)
    @JsonView(WithoutRelationJView.class)
    private String name;

    @NotNull(message = "{account.authority.constant.NotNull.message}")
    @Length(min = 1, max = 200, message = "{account.authority.constant.Length.message}")
    @Column(unique = true,nullable = false,length = 200)
    @JsonView(WithoutRelationJView.class)
    private String constant;

    @NotNull(message = "{account.authority.enabled.NotNull.message}")
    @JsonView(WithoutRelationJView.class)
    private Boolean enabled;

    @Length(max = 300, message = "{account.authority.description.Length.message}")
    @Column(length = 300)
    @JsonView(WithoutRelationJView.class)
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
