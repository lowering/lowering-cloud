package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.domain.Organization;
import io.github.lowering.account.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/organizations")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @GetMapping
    @JsonView(Id.WithRelationJView.class)
    public Iterable<Organization> index(){
        return organizationService.findAll();
    }

    @PostMapping
    public void save(@Validated @RequestBody Organization organization){
        organizationService.save(organization);
    }
}
