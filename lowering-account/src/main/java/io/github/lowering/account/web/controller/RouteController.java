package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.domain.Route;
import io.github.lowering.account.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping
    @JsonView(Id.WithoutRelationJView.class)
    public Iterable<Route> index(){
        Iterable<Route> routes = this.routeService.findAll();
        return routes;
    }

    @PostMapping
    public void save(@Validated @RequestBody Route route){
        this.routeService.save(route);
    }
}
