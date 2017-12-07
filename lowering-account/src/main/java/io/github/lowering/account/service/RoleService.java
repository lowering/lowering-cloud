package io.github.lowering.account.service;

import io.github.lowering.account.domain.Role;


public interface RoleService {

    Iterable<Role> findAll();
    Role findOne(String id);
    Role save(Role role);
}
