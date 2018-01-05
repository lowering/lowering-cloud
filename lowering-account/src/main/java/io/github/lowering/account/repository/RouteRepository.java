package io.github.lowering.account.repository;

import io.github.lowering.account.domain.Route;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RouteRepository extends CrudRepository<Route,String> {
}
