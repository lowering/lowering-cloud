package io.github.lowering.account.service.impl;

import io.github.lowering.account.domain.Role;
import io.github.lowering.account.repository.RoleRepository;
import io.github.lowering.account.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Iterable<Role> findAll() {
        return this.roleRepository.findAll();
    }

    @Override
    public Role findOne(String id) {
        return null;
    }
}
