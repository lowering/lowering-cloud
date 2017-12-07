package io.github.lowering.account.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "departments")
public class Department extends Id {

    @Column(nullable = false, length = 200)
    private String name;        //显示名称
    @Column(unique = true,nullable = false, length = 200)
    private String constant;    //唯一键
    @Column(length = 300)
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
