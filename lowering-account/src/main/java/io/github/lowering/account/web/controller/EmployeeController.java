package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.Employee;
import io.github.lowering.account.domain.Id;
import io.github.lowering.account.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    @JsonView(Id.WithRelationJView.class)
    public Iterable<Employee> index(){
        return employeeService.findAll();
    }

    @PostMapping
    public void save(@Validated @RequestBody Employee employee){
        employeeService.save(employee);
    }
}
