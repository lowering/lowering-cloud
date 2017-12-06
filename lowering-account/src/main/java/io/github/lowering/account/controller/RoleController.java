package io.github.lowering.account.controller;

import io.github.lowering.account.domain.Role;
import io.github.lowering.account.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping
    public ResponseEntity<Iterable<Role>> index(){
        Iterable<Role> roles = this.roleService.findAll();
        return ResponseEntity.ok(roles);
    }
}
