package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "organizations")
public class Organization extends Id {

    @NotNull(message = "{account.organization.name.NotNull.message}")
    @Length(min = 1,max = 200, message = "{account.organization.name.Length.message}")
    @Column(nullable = false,length = 200)
    @JsonView(WithoutRelationJView.class)
    private String name;    //组织名称

    @NotNull(message = "{account.organization.constant.NotNull.message}")
    @Length(min = 1,max = 200, message = "{account.organization.constant.Length.message}")
    @Column(unique = true,nullable = false,length = 200)
    @JsonView(WithoutRelationJView.class)
    private String constant;    //唯一键

    @ManyToOne
    @JoinColumn(name = "parent")
    @JsonView(WithRelationJView.class)
    private Organization parent;    //所属组织

    @OneToMany(mappedBy = "parent")
    private Set<Organization> children = new HashSet<>();   //下属组织

    @Length(message = "{account.organization.description.Length.message}")
    @Column(length = 300)
    @JsonView(WithoutRelationJView.class)
    private String description;

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

    public Organization getParent() {
        return parent;
    }

    public void setParent(Organization parent) {
        this.parent = parent;
    }

    public Set<Organization> getChildren() {
        return children;
    }

    public void setChildren(Set<Organization> children) {
        this.children = children;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
