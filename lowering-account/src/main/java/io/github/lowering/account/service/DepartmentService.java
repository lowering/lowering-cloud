package io.github.lowering.account.service;

import io.github.lowering.account.domain.Department;

public interface DepartmentService {
    Iterable<Department> findAll();
    Department findOne(String id);
    Department save(Department department);
}
