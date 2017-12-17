package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.domain.Menu;
import io.github.lowering.account.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/menus")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping
    @JsonView(Id.WithRelationJView.class)
    public Iterable<Menu> index(){
        return menuService.findAll();
    }

    @PostMapping
    public void save(@Validated @RequestBody Menu menu){
        menuService.save(menu);
    }
}
