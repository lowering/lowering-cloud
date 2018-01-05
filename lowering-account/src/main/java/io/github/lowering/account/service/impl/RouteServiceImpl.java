package io.github.lowering.account.service.impl;

import io.github.lowering.account.domain.Route;
import io.github.lowering.account.repository.RouteRepository;
import io.github.lowering.account.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class RouteServiceImpl implements RouteService {

    @Autowired
    private RouteRepository routeRepository;

    @Override
    public Iterable<Route> findAll() {
        return this.routeRepository.findAll();
    }

    @Override
    public Route findOne(String id) {
        return this.routeRepository.findOne(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Route save(Route route) {
        return this.routeRepository.save(route);
    }
}
