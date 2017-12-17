package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Authority;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/authorities")
public class AuthorityController {

    @Autowired

    private AuthorityService authorityService;

    @GetMapping
    @JsonView(Id.WithoutRelationJView.class)
    public Iterable<Authority> index(){
        return authorityService.findAll();
    }

    @PostMapping
    public void save(@Validated @RequestBody Authority authority){
        authorityService.save(authority);
    }
}
