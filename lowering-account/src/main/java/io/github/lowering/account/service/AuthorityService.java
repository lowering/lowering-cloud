package io.github.lowering.account.service;

import io.github.lowering.account.domain.Authority;

public interface AuthorityService {
    Iterable<Authority> findAll();
    Authority save(Authority authority);
    Authority findOne(String id);
}
