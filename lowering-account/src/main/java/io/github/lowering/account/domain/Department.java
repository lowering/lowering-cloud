package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "departments")
public class Department extends Id {

    @NotNull(message = "{account.department.name.NotNull.message}")
    @Length(min = 1,max = 200, message = "{account.department.name.Length.message}")
    @Column(nullable = false, length = 200)
    @JsonView(WithoutRelationJView.class)
    private String name;        //显示名称

    @NotNull(message = "{account.department.constant.NotNull.message}")
    @Length(min = 1, max = 200, message = "{account.department.constant.Length.message}")
    @Column(unique = true,nullable = false, length = 200)
    @JsonView(WithoutRelationJView.class)
    private String constant;    //唯一键

    @Length(message = "{account.department.description.Length.message}")
    @Column(length = 300)
    @JsonView(WithoutRelationJView.class)
    private String description; //备注
    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;  //所属组织

    @OneToMany(mappedBy = "department")
    private Set<Employee> employees = new HashSet<>();

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
}
