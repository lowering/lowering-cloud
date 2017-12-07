package io.github.lowering.account.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "employees")
public class Employee extends Id {

    @Column(nullable = false,length = 100)
    private String name;        //姓名
    @Column(length = 200)
    private String job;         //工作
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date created;       //入职日期
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updated;       //最后修改时间
    private Double salary;      //工资
    @ManyToOne
    @JoinColumn(name = "manager")
    private Employee manager;    //上级
    @OneToMany(mappedBy = "manager")
    private Set<Employee> employees = new HashSet<>();  //子员工

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;  //所属部门
    @Column(length = 11)
    private String phone;   //电话
    @Column(length = 100)
    private String email;   //邮箱
    @Column(length = 300)
    private String description;     //备注

    @OneToMany(mappedBy = "employee")
    private Set<User> users = new HashSet<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public Employee getManager() {
        return manager;
    }

    public void setManager(Employee manager) {
        this.manager = manager;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }
}
