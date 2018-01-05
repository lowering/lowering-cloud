package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "account_menus")
public class Menu extends Id {

    //菜单名称
    @NotNull(message = "{account.menu.name.NotNull.message}")
    @Length(min = 1,max = 100, message = "{account.menu.name.Length.message}")
    @Column(nullable = false,length = 100)
    @JsonView(WithoutRelationJView.class)
    private String name;
    //链接地址
    @NotNull(message = "{account.menu.href.NotNull.message}")
    @JsonView(WithoutRelationJView.class)
    private String href;
    //打开方式
    @NotNull(message = "{account.menu.target.NotNull.message}")
    @JsonView(WithoutRelationJView.class)
    private String target;
    //是否显示
    @NotNull(message = "{account.menu.shown.NotNull.message}")
    @JsonView(WithoutRelationJView.class)
    private Boolean shown;
    //描述
    @Length(max = 300, message = "{account.menu.description.Length.message}")
    @Column(length = 300)
    @JsonView(WithoutRelationJView.class)
    private String description;
    //扩展
    @JsonView(WithoutRelationJView.class)
    private String extension;

    @ManyToOne
    @JoinColumn(name = "parent")
    @JsonView(WithRelationJView.class)
    private Menu parent;
    @OneToMany(mappedBy = "parent")
    private Set<Menu> children = new HashSet<>();

    @ManyToMany(mappedBy = "menus")
    private Set<Role> roles = new HashSet<>();

    @OneToMany(mappedBy = "menu")
    @JsonView(WithRelationJView.class)
    private Set<Authority> authorities = new HashSet<>();

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

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
