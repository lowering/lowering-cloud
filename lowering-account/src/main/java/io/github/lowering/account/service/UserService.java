package io.github.lowering.account.service;

import io.github.lowering.account.domain.User;

public interface UserService {
    Iterable<User> findAll();
    User save(User user);
    User findOne(String id);
}
