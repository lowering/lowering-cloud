package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Department;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @GetMapping
    @JsonView(Id.WithoutRelationJView.class)
    public Iterable<Department> index(){
        return departmentService.findAll();
    }

    @PostMapping
    public void save(@RequestBody Department department){
        departmentService.save(department);
    }
}
