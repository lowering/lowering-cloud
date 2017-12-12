package io.github.lowering.account.service.impl;

import io.github.lowering.account.domain.Menu;
import io.github.lowering.account.repository.MenuRepository;
import io.github.lowering.account.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class MenuServiceImpl implements MenuService {


    @Autowired
    private MenuRepository menuRepository;

    @Override
    public Iterable<Menu> findAll() {
        return menuRepository.findAll();
    }

    @Override
    public Menu findOne(String id) {
        return menuRepository.findOne(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Menu save(Menu menu) {
        return menuRepository.save(menu);
    }
}
