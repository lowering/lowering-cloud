package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.enums.Sex;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends Id {
    //没有密码的视图
    public interface WithoutPasswordJView extends JView {};
    //密码视图
    public interface WithPasswordJView extends WithoutPasswordJView {};

    @Column(length = 300)
    @JsonView(WithoutPasswordJView.class)
    private String description;
    @Column(length = 100)
    @JsonView(WithoutPasswordJView.class)
    private String email;
    @JsonView(WithoutPasswordJView.class)
    private Boolean enabled;
    @JsonView(WithoutPasswordJView.class)
    private Boolean locked;
    @Column(length = 100, nullable = false)
    @JsonView(WithPasswordJView.class)
    private String password;
    @Enumerated
    @JsonView(WithoutPasswordJView.class)
    private Sex sex;
    @Column(length = 100, unique = true, nullable = false)
    @JsonView(WithoutPasswordJView.class)
    private String username;

    @ManyToMany
    @JoinTable(
            name = "users_roles",
            joinColumns = {
                    @JoinColumn(name = "user_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "role_id")
            }
    )
    private Set<Role> roles = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public Boolean getLocked() {
        return locked;
    }

    public void setLocked(Boolean locked) {
        this.locked = locked;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}
