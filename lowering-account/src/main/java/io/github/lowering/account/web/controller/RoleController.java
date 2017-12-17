package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.domain.Role;
import io.github.lowering.account.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    @JsonView(Id.WithoutRelationJView.class)
    public Iterable<Role> index(){
        Iterable<Role> roles = this.roleService.findAll();
        return roles;
    }

    @PostMapping
    public void save(@Validated @RequestBody Role role){
        this.roleService.save(role);
    }
}
