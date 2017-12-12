package io.github.lowering.account.service.impl;

import io.github.lowering.account.domain.Authority;
import io.github.lowering.account.repository.AuthorityRepository;
import io.github.lowering.account.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class AuthorityServiceImpl implements AuthorityService{

    @Autowired
    private AuthorityRepository authorityRepository;

    @Override
    public Iterable<Authority> findAll() {
        return authorityRepository.findAll();
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Authority save(Authority authority) {
        return authorityRepository.save(authority);
    }

    @Override
    public Authority findOne(String id) {
        return authorityRepository.findOne(id);
    }
}

