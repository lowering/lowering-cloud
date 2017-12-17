package io.github.lowering.account.domain;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.enums.Sex;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
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

    @Email(message = "{account.user.email}")
    @Column(length = 100)
    @JsonView(WithoutPasswordJView.class)
    private String email;

    @NotNull(message = "{account.user.enabled.not-null}")
    @JsonView(WithoutPasswordJView.class)
    private Boolean enabled;

    @NotNull(message = "{account.user.locked.not-null}")
    @JsonView(WithoutPasswordJView.class)
    private Boolean locked;

    @NotNull(message = "{account.user.password.not-null}")
    @Length(message = "{account.user.password.length}")
    @Column(length = 100, nullable = false)
    @JsonView(WithPasswordJView.class)
    private String password;

    @NotNull(message = "{account.user.sex.not-null}")
    @Enumerated
    @JsonView(WithoutPasswordJView.class)
    private Sex sex;

    @NotBlank(message = "{account.user.username.not-blank}")
    @Length(message = "{account.user.username.length}")
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
