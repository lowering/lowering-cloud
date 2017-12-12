package io.github.lowering.account.repository;

import io.github.lowering.account.domain.Department;
import org.springframework.data.repository.CrudRepository;

public interface DepartmentRepository extends CrudRepository<Department,String> {
}
