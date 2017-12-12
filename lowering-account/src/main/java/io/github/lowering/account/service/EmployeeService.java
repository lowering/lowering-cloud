package io.github.lowering.account.service;

import io.github.lowering.account.domain.Employee;

public interface EmployeeService {
    Employee save(Employee employee);
    Employee findOne(String id);
    Iterable<Employee> findAll();
}
