package io.github.lowering.account.service;

import io.github.lowering.account.domain.Route;


public interface RouteService {

    Iterable<Route> findAll();
    Route findOne(String id);
    Route save(Route route);
}
