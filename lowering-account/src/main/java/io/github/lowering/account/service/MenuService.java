package io.github.lowering.account.service;

import io.github.lowering.account.domain.Menu;

public interface MenuService {
    Iterable<Menu> findAll();
    Menu findOne(String id);
    Menu save(Menu menu);
}
